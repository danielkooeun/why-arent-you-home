import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { Circle } from 'react-native-maps';

function Hiders(props) {
  const hiders = props.hiders;
  const radius = props.radius;
  const listItems = hiders.map((player) =>
    (<Circle
      key={ player.key }
      center={ player.position }
      radius={ radius * 0.02 }
      fillColor={ `rgba(255,65,54, ${ player.fade.level })` }
      strokeColor="rgba(0, 0, 0, 0)"/>)
  );
  return (
    <View>{listItems}</View>
  );
}

function HiderLocations(props) {
  const hiders = props.hiders;
  const radius = props.radius;
  const listItems = hiders.map((player) => 
    (<Button
      onPress={ this.props.navigation.navigate('location', { photo: player.photo }) }
      title={ `${player.key} photo`}
    />)
  )
}



export {
  Hiders,
  HiderLocations,
};