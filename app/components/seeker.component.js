import React, { Component } from 'react';
import { StyleSheet, Platform, Text, View } from 'react-native';
import MapView, { Circle, AnimatedRegion, Animated } from 'react-native-maps';
import { Constants, Location, Permissions } from 'expo';

const latitudeDelta = 0.004;
const longitudeDelta = 0.005;

let FADE_LVL = 1;
let FADE_CHANGE = false;

export default class Seeker extends Component {
  constructor(props) {
    super(props);
    console.log('Constructing...');

    this.state = {
      radius: 200,
      region: null,
      gameRegionSelected: false,
      gameRegion: null,
      userPosition: null,
      updater: true,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  componentWillUnmount() {
    clearInterval(this.tracker);
    clearInterval(this.fader);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  onGameRegionChange(gameRegion) {
    this.setState({ gameRegion });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta,
      longitudeDelta,
    };
    this.onRegionChange(region);
    this.onGameRegionChange(region);
    this.setState({
      gameRegionSelected: true,
    });
    console.log(location);

    this.tracker = setInterval(this._getUserLocation, 1000);
    this.fader = setInterval(this._userFade, 100);
  }

  _getUserLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ userPosition: location.coords });
  }

  _userFade = async () => {
    if (FADE_CHANGE) {
      FADE_LVL += 0.05;
      if (FADE_LVL >= 1) FADE_CHANGE = false;
    } else {
      FADE_LVL -= 0.05;
      if (FADE_LVL <= 0) FADE_CHANGE = true;
    }
    this.setState({ updater: true });
  }

  render() {
    return (
      <View style={ styles.game }>
        { this.state.region && this.state.userPosition ? (
          <MapView
            initialRegion={ this.state.region }
            onRegionChange={ (region) => this.onRegionChange(region) }
            style={ styles.map }>
            {/* TODO: make relative to the latlon delta */}
              <View>
                <Circle
                  center={ this.state.gameRegion }
                  radius={ this.state.radius } 
                  fillColor="rgba(135, 206, 250, 0.2)"
                  strokeColor="#4682b4"
                />
                <Circle
                  center={ this.state.userPosition }
                  radius={ this.state.radius * 0.02 } 
                  fillColor={ `rgba(0, 0, 0, ${ FADE_LVL })` }
                  strokeColor="rgba(0, 0, 0, 0)"
                />
              </View>
          </MapView>) : (
          <Text style={ styles.loading }>Loading...</Text>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    textAlign: 'center',
    paddingTop: 200,
    fontSize: 40,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 400,
  },
});
