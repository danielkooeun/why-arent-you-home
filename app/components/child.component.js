import React, { Component } from 'react';
import { AppRegistry, TextInput, Button, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class Child extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <View
        style={ styles.bg }>
        <View>
          <Text>Child</Text>
        </View>
        <Button
          color='red'
          title='place holder child' //change this to redirect to YOU GOT CAUGHT
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg:{
    padding: 50,
    height: '100%',
    backgroundColor: 'black'
  }
})