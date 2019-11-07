import React from 'react';
import { Text, View, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import GameScreen from '../components/game'
import GiftScreen from '../components/gift'
import ShopScreen from '../components/shop'
import InfoScreen from '../components/info'
import MineScreen from '../components/mine'


const TabNavigator = createBottomTabNavigator({
  Game: {
    screen: GameScreen,
    navigationOptions: {
      title: '游戏'
    }
  },
//  Gift: {
//    screen: GiftScreen,
//    navigationOptions: {
//      title: '礼包'
//    }
//  },
//  Shop: {
//    screen: ShopScreen,
//    navigationOptions: {
//      title: '商城'
//    }
//  },
//  Info: {
//    screen: InfoScreen,
//    navigationOptions: {
//      title: '资讯'
//    }
//  },
  Mine: {
    screen: MineScreen,
    navigationOptions: {
      title: '我的'
    }
  },
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Game') {
          iconName = `logo-game-controller-b`;
        } else if (routeName === 'Gift') {
          iconName = `ios-gift`;
        } else if (routeName === 'Shop') {
          iconName = `ios-cart`;
        } else if (routeName === 'Info') {
          iconName = `ios-list-box`;
        } else if (routeName === 'Mine') {
          iconName = `ios-person`;
        }
        // You can return any component that you like here!
        return <IconComponent name={ iconName } size={ 25 } color={ tintColor } />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#e54d42',
    inactiveTintColor: '#666666'
  }
});

export default createAppContainer(TabNavigator);