import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { Circle, Callout, Marker } from 'react-native-maps';

export default function Hiders(props) {
  const hiders = props.hiders;
  const radius = props.radius
  const listItems = hiders.map((player) =>
    (<Circle
      key={ player.key }
      center={ player.position }
      radius={ radius * 0.02 }
      fillColor={ `rgba(135, 206, 250, ${ player.fade.level })` }
      strokeColor="rgba(0, 0, 0, 0)"/>)
  );
  return (
    <View>{listItems}</View>
  );
}

//this.props.navigation.navigate('location', { photo: player.photo })