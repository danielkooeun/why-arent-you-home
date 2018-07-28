import React, { Component } from 'react';
import { AppRegistry, TextInput, Button, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class Login extends Component {
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
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.gameNum}
          keyboardType = 'numeric'
          placeholder="Game #"
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.name}
          placeholder='Nickname'
        />
        <Button
          title='Enter Game'
          onPress={() => this.props.navigation.navigate('start')}
        />
      </View>
    );
  }
}