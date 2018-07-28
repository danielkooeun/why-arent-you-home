import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Start from '../components/start.component';

export default class StartScreen extends Component {
  constructor(props){
    super(props)
  }
  render (){
    return (
      <View>
        <Start {...this.props}/>
      </View>
    )}
}
