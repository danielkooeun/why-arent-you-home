import React, { Component } from 'react';
import { AppRegistry, TextInput, Button, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class Seeker extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <View
        style={{
          padding: 50,
          paddingTop: 200
        }}>
        <Text>seeker</Text>
      </View>
    );
  }
}