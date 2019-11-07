import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

class GiftScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Gift Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Gift: {
    screen: GiftScreen,
  },
});

export default AppNavigator;