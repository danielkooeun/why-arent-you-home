import React, { Component } from 'react';
import { Image, View } from 'react-native';

export default class Location extends Component {
  constructor (props) {
    super(props);
    this.state = {
      photo: this.props.photo,
    };
    console.log('adfsdf');
  }
  render() {
    return (
      <Image
        source={{ uri: this.state.photo }}
        style={{ width: 300, height: 300 }}
      />
    );
  }
}