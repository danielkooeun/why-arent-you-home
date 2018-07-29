import React, { Component } from 'react';
import { StyleSheet, FlatList, Platform, Text, View } from 'react-native';
import MapView, { Circle, AnimatedRegion, Animated } from 'react-native-maps';
import { Constants, Location, Permissions } from 'expo';

import Hiders from './hider.viewer.component';

const latitudeDelta = 0.004;
const longitudeDelta = 0.005;



export default class Seeker extends Component {
  constructor(props) {
    super(props);
    console.log('Constructing...');

    this.state = {
      radius: 200,
      region: null,
      gameRegionSelected: false,
      gameRegion: null,
      fade: {
        level: 1,
        change: false,
      },
      userPosition: null,
      updater: true,
      timer: {
        time: 10,
        timeout: false,
      },
      hiders: [
        {
          key: 'zoe',
          position: {
            latitude: 43.658,
            longitude: -79.399,
          },
          fade: {
            level: 0.5,
            change: true,
          },
          photo: 'https://wallpapersultra.net/wp-content/uploads/Funny-Pictures.jpg',
        }
      ],
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
    await _intervalSetters();
  }

  _intervalSetters() {
    this.tracker = setInterval(this._getUserLocation, 1000);
    this.counter = setInterval(this._countDown, 1000);
    this.fader = setInterval(this._userFade.bind(null, this.state.fade), 100);
    this.intervals = [];
    this.state.hiders.forEach((player) => this.intervals.push(setInterval(this._userFade.bind(null, player.fade), 100)));
  }

  _intervalDisablers () {
    clearInterval(this.tracker);
    clearInterval(this.fader);
    clearInterval(this.counter);
    this.intervals.forEach((interval) => clearInterval(interval));
  }

  _getUserLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ userPosition: location.coords });
  }

  _userFade = async (fade) => {
    if (fade.change) {
      fade.level += 0.05;
      if (fade.level >= 1) fade.change = false;
    } else {
      fade.level -= 0.05;
      if (fade.level <= 0) fade.change = true;
    }
    this.setState({ updater: true });
  }

  // Timer Functions
  _countDown = async () => {
    if (!this.state.timer.timeout)
      this.setState({
        timer: {
          time: this.state.timer.time - 1,
          timeout: this.state.timer.timeout,
        }
      })
    if ( this.state.timer.time <= 0)
      this.setState({
        timer: {
          time: 0,
          timeout: true,
        }
      })
    console.log(this.state.timer.time);
  }

  convertTime() {
    let minutes = Math.floor(this.state.timer.time / 60);
    let seconds = this.state.timer.time - minutes * 60;

    return minutes + ' : ' + seconds;
  }

  render() {
    return (
      <View>
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
                  fillColor={ `rgba(0, 0, 0, ${ this.state.fade.level })` }
                  strokeColor="rgba(0, 0, 0, 0)"
                />
                <Hiders hiders={ this.state.hiders } radius={ this.state.radius } />
              </View>
          </MapView>) : (
          <Text style={ styles.loading }>Loading...</Text>
          )
        }
        <Text style={{ fontSize: 60, paddingTop: 450, textAlign: 'center' }}>  { this.convertTime() }  </Text>
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
