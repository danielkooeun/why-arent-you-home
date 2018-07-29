import React, { Component } from 'react';
import { AppRegistry, TextInput, Button, View, Text, StyleSheet } from 'react-native';
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
        style={ styles.bg }>
        <View
          style={{
            paddingVertical: 100
          }}>
          <Text style={ styles.room }>Room: 001</Text>
          <Text style={ styles.player }>- daniel -</Text>
          <Text style={ styles.player }>- zoe -</Text>
          <Text style={ styles.player }>- erick -</Text>
        </View>
        <Button
          color='red'
          title='Ready'
          onPress={ () => this.props.navigation.navigate('hide') }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  player: {
    color: 'white',
    padding: 10,
    textAlign: 'center'
  },
  room: {
    color: 'red',
    textAlign: 'center',
    padding:10,
    paddingBottom: 50
  },
  bg:{
    padding: 50,
    height: '100%',
    backgroundColor: 'black'
  }
})