import React from "react"
import { Platform, AppRegistry } from "react-native"
import { Constants } from "expo"
import { Ionicons } from "@expo/vector-icons"
import { Header, createStackNavigator, createBottomTabNavigator } from "react-navigation"

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"
import { capitalize } from "lodash"

import HomeScene from "../Scenes/Home"
import FavoritesScene from "../Scenes/Favorites"
import AuthenticationScreen from "../Containers/Authentication"
// import BreweryDetailsScreen from "../screens/BreweryDetailsScreen"
// import BreweryListScreen from "../screens/BreweryListScreen"
// import BreweryMapScreen from "../screens/BreweryMapScreen"
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"
import SettingsScreen from "../Containers/SettingsScreen"

// const ListStack = createStackNavigator(
//   {
//     list: {
//       screen: BreweryListScreen,
//     },
//     details: {
//       screen: BreweryDetailsScreen,
//     },
//   },
//   {
//     headerMode: "none",
//     cardStyle: {
//       backgroundColor: "#fff",
//     },
//   }
// )

const SettingsStack = createStackNavigator(
  {
    mainSettings: {
      screen: SettingsScreen,
    },
  },
  {
    navigationOptions: {
      title: "Settings",
      headerTitleStyle: {
        fontFamily: "OpenSans-Bold",
        fontSize: 17,
        letterSpacing: -0.5,
        fontWeight: Platform.OS === "android" ? "400" : "normal",
      },
      headerStyle: {
        backgroundColor: "#fff",
        ...Platform.select({
          android: {
            paddingTop: Constants.statusBarHeight,
            height: Header.HEIGHT + Constants.statusBarHeight,
          },
        }),
      },
    },
  }
)

const createTabNavigator = Platform.OS === "ios" ? createBottomTabNavigator : createMaterialBottomTabNavigator

export default createTabNavigator(
  {
    home: {
      screen: HomeScene,
    },
    favorites: {
      screen: FavoritesScene,
    },
    settings: {
      screen: SettingsStack,
    },
  },
  {
    navigationOptions: ({ navigation }) => {
      let { routeName } = navigation.state
      let tabBarLabel = capitalize(routeName)
      // if (tabBarLabel === "List") {
      //   tabBarLabel = "Brewery List"
      // }
      // TODO: fix icons
      return {
        tabBarLabel,
        tabBarIcon: ({ focused }) => {
          const { routeName } = navigation.state
          let iconName
          switch (routeName) {
            case "list":
              iconName = Platform.OS === "ios" ? "ios-list" : "md-list"
              break
            case "map":
              iconName = Platform.OS === "ios" ? "ios-map-outline" : "md-map"
              break
            case "settings":
              iconName = Platform.OS === "ios" ? "ios-options-outline" : "md-options"
          }
          return (
            <Ionicons
              name={iconName}
              size={30}
              style={{ marginBottom: Platform.OS === "ios" ? -3 : 0 }}
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          )
        },
      }
    },
    activeTintColor: Colors.tabIconSelected,
    inactiveTintColor: Colors.tabIconDefault,
    tabBarOptions: {
      activeTintColor: Colors.tabIconSelected,
      inactiveTintColor: Colors.tabIconDefault,
    },
  }
)
