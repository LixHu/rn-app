import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './home'
import Detail from './detail'
import GamePage from './gamePage'
import Login from '../tools/login'
import payInfo from '../tools/pay_info'
import Reg from '../tools/reg'

const AppNavigator = createStackNavigator({
    Home,
    Detail:{
        screen: Detail,
        navigationOptions: {
            headerTitleStyle: {
                marginLeft: 0
            }
        }
    },
    GamePage: {
        screen: GamePage,
        navigationOptions: {
            headerTitleStyle: {
                marginLeft: 0
            }
        }
    },
    Login,
    payInfo: {
        screen: payInfo,
        navigationOptions: {
            headerTitleStyle: {
                marginLeft: 0
            }
        }
    },
    Reg,
});

AppNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
    };
};

export default AppNavigator;
