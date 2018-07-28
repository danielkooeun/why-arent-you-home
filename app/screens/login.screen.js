import React, { Component } from 'react';
import {
  View,
  Image
} from 'react-native';

import Login from '../components/login.component';

export default class LoginScreen extends Component {
  constructor (props) {
    super(props)
  }
  render() {
    return (
      <View>
        <Login {...this.props}/>
      </View>
    )
  }
}