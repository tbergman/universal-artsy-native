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
      let tabBarLabel = capitalize(routeName);
      if (tabBarLabel === 'List') {
        tabBarLabel = 'Brewery List';
      }
      return {
        tabBarLabel,
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
          // const { routeName } = navigation.state;
          // let iconName;
          // let imageSrc '';
          // switch (routeName) {
          //   case 'home':
          //     // iconName = Platform.OS === 'ios' ? 'ios-list' : 'md-list';
          //     // imageSrc = '/growler-prowler/images/navigation/nav_home@3x.png';
          //     imageSrc = '../images/navigation/nav_home.png';
          //     break;
          //   case 'list':
          //     // iconName = Platform.OS === 'ios' ? 'ios-list' : 'md-list';
          //     // imageSrc = '/growler-prowler/images/navigation/nav_home@3x.png';
          //     imageSrc = '../images/navigation/nav_home.png';
          //     break;
          //   case 'map':
          //     // iconName = Platform.OS === 'ios' ? 'ios-map-outline' : 'md-map';
          //     imageSrc = '../images/navigation/nav_home.png';
          //     break;
          //   case 'settings':
          //     // iconName =
          //     //   Platform.OS === 'ios' ? 'ios-options-outline' : 'md-options';
          //     imageSrc = '../images/navigation/nav_home.png';
          // }
          // return (
          //   <Ionicons
          //     name={iconName}
          //     size={30}
          //     style={{ marginBottom: Platform.OS === 'ios' ? -3 : 0 }}
          //     color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          //   />
          // );
          return (
            <Image
              style={{ width: 90, height: 90 }}
              // source={require('/growler-prowler/images/navigation/nav_home@3x.png')}
              // source={require("../../../../../images/whitespinner.png")}
              source={require('../images/navigation/nav_home.png')}
              // source={require(imageSrc)}
            />
          )
        },
      };
    },
    activeTintColor: Colors.tabIconSelected,
    // inactiveTintColor: Colors.tabIconDefault,
    inactiveTintColor: 'red',
    tabBarOptions: {
      activeTintColor: Colors.tabIconSelected,
      inactiveTintColor: Colors.tabIconDefault,
    },
    barStyle: { backgroundColor: 'white'}
  }
);
