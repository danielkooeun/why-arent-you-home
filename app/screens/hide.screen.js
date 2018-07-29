import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import Hide from '../components/hide.component';

export default class hideScreen extends Component {
  constructor (props) {
    super(props)
  }
  render() {
    return (
      <View>
        <Hide {...this.props}/>
      </View>
    )
  }
}