import React, { Component } from 'react';
import { View } from 'react-native';

import Location from '../components/location.photo.component';

export default class SeekerScreen extends Component {
  constructor (props) {
    super(props)
  }
  render() {
    const { navigation } = this.props;
    const photo = navigation.getParam('photo', 'https://i.4pcdn.org/s4s/1510200817001.png');
    return (
      <View>
        <Location photo={ photo }/>
      </View>
    )
  }
}