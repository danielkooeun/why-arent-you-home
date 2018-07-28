import React, { Component } from 'react';
import { StyleSheet, Platform, Text, View } from 'react-native';
import MapView, { Circle, AnimatedRegion, Animated } from 'react-native-maps';
import { Constants, Location, Permissions } from 'expo';

const latitudeDelta = 0.004;
const longitudeDelta = 0.005;

let fadeLevel = 1;
let fadeChange = false;

export default class App extends Component {
  constructor(props) {
    super(props);
    console.log('Constructing...');

    this.state = {
      radius: 200,
      region: null,
      gameRegionSelected: false,
      gameRegion: null,
      userPosition: {
        latitude: 0,
        longitude: 0,
      },
      updater: true,
    };
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  componentDidMount() {
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
    this.fader = setInterval(this._userFade, 200);
  }

  _getUserLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ userPosition: location.coords });
  }

  _userFade = async () => {
    if (fadeChange) {
      fadeLevel += 0.1;
      if (fadeLevel >= 1) fadeChange = false;
    } else {
      fadeLevel -= 0.1;
      if (fadeLevel <= 0) fadeChange = true;
    }
    console.log(`this is fadeChange: ${fadeChange} and fadeLevel: ${fadeLevel}`);
    this.setState({ updater: true });
  }

  render() {
    return (
      <View>
        { this.state.region &&
          <MapView
            initialRegion={ this.state.region }
            onRegionChange={ (region) => this.onRegionChange(region) }
            style={ styles.map }>
            {/* TODO: make relative to the latlon delta */}
            { this.state.gameRegion &&
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
                  fillColor={ `rgba(0, 0, 0, ${ fadeLevel })` }
                  strokeColor="rgba(0, 0, 0, 0)"
                />
              </View>
            }
          </MapView>
        }
        <View style={ styles.container}>
          <Text>Hello World!</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
