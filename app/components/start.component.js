import React, { Component } from 'react';
import { AppRegistry, TextInput, Button, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class Start extends Component {
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
        <Text>User Name</Text>
        <Text>User Name</Text>
        <Text>User Name</Text>
        <Button
          title='Ready'
          onPress={() => this.props.navigation.navigate('seeker')}
        />
      </View>
    );
  }
}