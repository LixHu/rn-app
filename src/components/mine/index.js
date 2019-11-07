import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './home'
import Detail from './detail'

const AppNavigator = createStackNavigator({
  Home,
  Detail,
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
