import React, { Component } from 'react';
import {
  View,
  Image
} from 'react-native';

import Seeker from '../components/seeker.component';

export default class SeekerScreen extends Component {
  constructor (props) {
    super(props)
  }
  render() {
    return (
      <View>
        <Seeker {...this.props}/>
      </View>
    )
  }
}