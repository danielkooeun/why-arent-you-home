import React, { Component } from 'react';
import { AppRegistry, TextInput, Button, View, StyleSheet, Image } from 'react-native';
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
        style={ styles.bg }>     
        <Image
        source={ require('../../assets/futureIcon.jpg') }
        style={{ height: 150}}
        />
        <View style={ styles.fieldsView }>
          <TextInput 
            style={ styles.fields }
            onChangeText={(text) => this.setState({text})}
            value={this.state.gameNum}
            keyboardType = 'numeric'
            placeholder="Game #"
            placeholderTextColor='gray'
          />
        </View>
        <View style={ styles.fieldsView }>
          <TextInput
            style={ styles.fields }
            onChangeText={(text) => this.setState({text})}
            value={this.state.name}
            placeholder='Nickname'
            placeholderTextColor='gray'
          />
        </View>
        <Button 
          color='red'
          title='Enter Game'
          onPress={() => this.props.navigation.navigate('start')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fields: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
    color: 'white',
    padding: 10
  },
  fieldsView: {
    paddingVertical: 10,
  },
  bg:{
    padding: 50,
    height: '100%',
    backgroundColor: 'black'
  }
})