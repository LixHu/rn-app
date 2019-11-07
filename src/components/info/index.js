import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

class InfoScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Info Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Info: {
    screen: InfoScreen,
  },
});

export default AppNavigator;