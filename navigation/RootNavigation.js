import React from 'react';
import { Platform, Image, View, Button, Text } from 'react-native';
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
import FavoritesScene from "../src/lib/Scenes/Favorites"
import ZeroStateInbox from "../src/lib/Components/Inbox/Conversations/ZeroStateInbox.tsx"
// '/src/lib/Scenes/Home/index.tsx'

import AuthenticationScreen from '../screens/AuthenticationScreen';
// import BreweryDetailsScreen from '../screens/BreweryDetailsScreen';
// import BreweryListScreen from '../screens/BreweryListScreen';
import BreweryMapScreen from '../screens/BreweryMapScreen';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
// import SettingsScreen from '../screens/SettingsScreen';
// import SearchScreen from '../src/lib/Containers/SearchScreen';
import { BlurView } from 'expo';

const createTabNavigator =
  Platform.OS === 'ios'
    ? createBottomTabNavigator
    : createMaterialBottomTabNavigator;

const Tabs = createTabNavigator(
  {
    home: {
      screen: HomeScene,
    },
    Search: {
      screen: View,
    },
    messaging: {
      screen: ZeroStateInbox,
    },
    favorites: {
      screen: FavoritesScene,
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
            case 'search': {
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
            case 'messaging': {
              iconName = 'message-text-outline'
              break;
            }
            case 'favorites': {
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
        // tabBarOnPress: ({previousScene, scene, jumpToIndex }) => {
        //   const isSearch = scene.route=== 'Search';
        //   return isSearch 
        //   ? navigation.navigate('SearchModal') 
        //   : jumpToIndex(scene.index)
        // },
        tabBarOnPress: ({ navigation }) => {
          console.log(navigation)
          const isSearch = navigation.state.routeName === 'Search';
          console.log(`is search ?:' ${isSearch}`)
          console.log(`route name : ${navigation.state.routeName}`)
          return isSearch 
          ? navigation.navigate('SearchModal') 
          : navigation.navigate(navigation.state.routeName) 
        },
      };
    },
    shifting: false,
    labeled: false,
    activeTintColor: Colors.tabIconSelected,
    inactiveTintColor: Colors.tabIconDefault,
    barStyle: { backgroundColor: 'white'},
    // tabBarOnPress: ({previousScene, scene, jumpToIndex }) => {
    //   const isSearch = scene.route=== 'Search';
    //   return isSearch 
    //   ? navigation.navigate('SearchModal') 
    //   : jumpToIndex(scene.index)
    // }
  }
);

const Screen = (props) => (
  <BlurView
  style={{
      flex: 1,
      borderRadius: 12,
      paddingBottom: 20,
      justifyContent: "center",
      alignItems: "center",
      height: 200,
      width: 200,
      backgroundColor: 'transparent'
  }}
  tint="light" intensity={50}
>
    <Text>{props.title} Screen</Text>
    </BlurView>
);

/*
 * Place the search screen into a stack navigator so that we can easily use the existing header.
 */
// const SearchStack = createStackNavigator({
//   Search: {
//     screen: (props) => <Screen title="Search" {...props} />,
//     navigationOptions: ({ navigation }) => ({
//       headerTitle: 'Search',
//       headerLeft: (
//         <Button
//           title="Cancel"
//           // Note that since we're going back to a different navigator (CaptureStack -> RootStack)
//           // we need to pass `null` as an argument to goBack.
//           onPress={() => navigation.goBack(null)}
//         />
//       ),
//     }),
//   },
// // }
// //   {  
// //     transitionConfig: () => ({
// //       containerStyle: {
// //           backgroundColor: 'red',
// //           opacity: 0.5,
// //       }
// //     }),
// //   }
// })

/*
 * We need a root stack navigator with the mode set to modal so that we can open the capture screen
 * as a modal. Defaults to the Tabs navigator.
 */
const RootStack = createStackNavigator({
  Tabs: {
    screen: Tabs,
  },
  SearchModal: {
    screen: (props) => <Screen title="Search" {...props} />,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
}, {
  headerMode: 'none',
  mode: 'modal',
  cardStyle: {
    shadowColor: 'transparent',
    // opacity:0.99
  },
  // transitionConfig: {
  //   containerStyle: {
  //     backgroundColor: 'transparent',
  //   },
  // }
  // transitionConfig: () => {
  //   return {
  //     containerStyle: {
  //       backgroundColor: 'transparent',
  //     },
  //   }
  // },
  transitionConfig: () => ({
    containerStyle: {
        backgroundColor: 'transparent',
        // opacity: 0.5,
    }
  }),
});

export default RootStack;