import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Child from '../components/child.component';

export default class ChildScreen extends Component {
  constructor(props){
    super(props)
  }
  render (){
    return (
      <View>
        <Child {...this.props}/>
      </View>
    )}
}
