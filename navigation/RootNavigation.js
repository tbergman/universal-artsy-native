import React from 'react';
import { Platform, Image } from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import {
  Header,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import {
  createMaterialBottomTabNavigator,
} from 'react-navigation-material-bottom-tabs';
import { capitalize } from 'lodash';
import Images from '@assets/images';
import HomeScene from "../src/lib/Scenes/Home"
// '/src/lib/Scenes/Home/index.tsx'

import AuthenticationScreen from '../screens/AuthenticationScreen';
import BreweryDetailsScreen from '../screens/BreweryDetailsScreen';
import BreweryListScreen from '../screens/BreweryListScreen';
import BreweryMapScreen from '../screens/BreweryMapScreen';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import SettingsScreen from '../screens/SettingsScreen';

const ListStack = createStackNavigator(
  {
    list: {
      screen: BreweryListScreen,
    },
    details: {
      screen: BreweryDetailsScreen,
    },
  },
  {
    headerMode: 'none',
    cardStyle: {
      backgroundColor: '#fff',
    },
  }
);

const SettingsStack = createStackNavigator(
  {
    mainSettings: {
      screen: SettingsScreen,
    },
  },
  {
    navigationOptions: {
      title: 'Settings',
      headerTitleStyle: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 17,
        letterSpacing: -0.5,
        fontWeight: Platform.OS === 'android' ? '400' : 'normal',
      },
      headerStyle: {
        backgroundColor: '#fff',
        ...Platform.select({
          android: {
            paddingTop: Constants.statusBarHeight,
            height: Header.HEIGHT + Constants.statusBarHeight,
          },
        }),
      },
    },
  }
);

const createTabNavigator =
  Platform.OS === 'ios'
    ? createBottomTabNavigator
    : createMaterialBottomTabNavigator;

export default createTabNavigator(
  {
    home: {
      screen: HomeScene,
    },
    list: {
      screen: ListStack,
    },
    map: {
      screen: BreweryMapScreen,
    },
    settings: {
      screen: SettingsStack,
    },
  },
  {
    navigationOptions: ({ navigation }) => {
      let { routeName } = navigation.state;
      // let tabBarLabel = capitalize(routeName);
      // if (tabBarLabel === 'List') {
      //   tabBarLabel = 'Brewery List';
      // }
      return {
        // showLabel: false,
        // showIcon: false,
        // tabBarVisible: false,
        title: '',
        
        // tabBarLabel,
        // tabBarIcon: () => {
          // return (<Image
          //     style={{ width: 90, height: 90 }}
          //     // source={{ uri: "https://facebook.github.io/react/img/logo_og.png" }}
          //     source={require('../images/navigation/nav_home.png')}
          //     // '/Users/tbergman/React-Native/Projects/Expo/growler-prowler/images/navigation/nav_home@3x.png'
          //     />);}
        // tabBarIcon: <Image
        //       style={{ width: 90, height: 90 }}
        //       // source={require('/growler-prowler/images/navigation/nav_home@3x.png')}
        //       // source={require("../../../../../images/whitespinner.png")}
        //       source={require("../images/whitespinner.png")}
        //     />
        tabBarIcon: ({ focused }) => {
          const { routeName } = navigation.state;
          // let iconName
          // let imageSrc
          switch (routeName) {
            case 'home': {
              return (
                <Image
                  style={{ width: 40, height: 40 }}
                  source={Images.navHomeIcon}
                  // color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                />
              )
            }
            case 'list': {
              // imageSrc = Images.navSearchIcon;
              return (
                <Image
                  style={{ width: 30, height: 30 }}
                  source={Images.navSearchIcon}
                  // color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                />
              )
            }
            case 'map': {
              return (
                <Image
                  style={{ width: 30, height: 30 }}
                  source={Images.navMessageingIcon}
                  // color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                />
              )
            }
            case 'settings': {
              return (
                <Image
                  style={{ width: 30, height: 30 }}
                  source={Images.navFavoritesIcon}
                  // color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                />
              )
            }
          }
          // return (
          //   <Ionicons
          //     name={iconName}
          //     size={30}
          //     style={{ marginBottom: Platform.OS === 'ios' ? -3 : 0 }}
          //     color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          //   />
          // );
          // return (
          //   <Image
          //     style={{ width: 90, height: 90 }}
          //     // source={require('/growler-prowler/images/navigation/nav_home@3x.png')}
          //     // source={require("../../../../../images/whitespinner.png")}
          //     // source={require('../images/navigation/nav_home.png')}
          //     source={imageSrc) }
          //   />
          // )
        },
      };
    },
    activeTintColor: Colors.tabIconSelected,
    inactiveTintColor: Colors.tabIconDefault,
    // style: { width: 40, height: 40, backgroundColor: 'blue'},
    // tabStyle: { width: 40, height: 40, backgroundColor: '#000'},
    // showLabel: false,
    // showIcon: false,
    // inactiveTintColor: 'red',
    tabBarOptions: {
      activeTintColor: Colors.tabIconSelected,
      inactiveTintColor: Colors.tabIconDefault,
      // style: { width: 40, height: 40, backgroundColor: 'blue'},
      // tabStyle: { width: 40, height: 40, backgroundColor: 'blue'},
      // tabBarIcon: { width: 40, height: 40, }
    },
    barStyle: { backgroundColor: 'white'}
  }
);
