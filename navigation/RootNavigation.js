import React from 'react';
import { Platform, Image, View } from 'react-native';
import { Constants } from 'expo';
import { Ionicons, Foundation, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
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
      return {
        title: '',
        tabBarIcon: ({ focused }) => {
          const { routeName } = navigation.state;
          let iconName
          switch (routeName) {
            case 'home': {
              iconName = 'home-outline'
              break;
            }
            case 'list': {
              iconName = 'search'
              return (
                <MaterialIcons
                  style={{ backgroundColor: 'transparent',
                  transform: [{rotateY: '180deg'}],
                  marginBottom: Platform.OS === 'ios' ? -3 : 0,
                  }}
                  name={iconName}
                  size={24}
                  color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                />
              )
            }
            case 'map': {
              iconName = 'message-text-outline'
              break;
            }
            case 'settings': {
              iconName = 'heart-outline'
              break;
            }
          }
          return(
            <MaterialCommunityIcons
              style={{ backgroundColor: 'transparent', marginBottom: Platform.OS === 'ios' ? -3 : 0 }}
              name={iconName}
              size={24}
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          )
        },
      };
    },
    shifting: false,
    labeled: false,
    activeTintColor: Colors.tabIconSelected,
    inactiveTintColor: Colors.tabIconDefault,
    barStyle: { backgroundColor: 'white'}
  }
);
