import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

class ShopScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Shop Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Shop: {
    screen: ShopScreen,
  },
});

export default AppNavigator;