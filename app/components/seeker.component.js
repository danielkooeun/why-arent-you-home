import React, { Component } from 'react';
import { StyleSheet, FlatList, Platform, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Circle, AnimatedRegion, Animated } from 'react-native-maps';
import { Constants, Location, Permissions } from 'expo';

import { Hiders, HiderLocations } from './hider.viewer.component';

const MAP_STYLE = require('../../assets/mapStyle');
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
        seconds: 15,
        timeout: false,
      },
      hiders: [],
    };
  }

  componentWillMount() {
    this._getLocationAsync();
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    this._intervalDisablers();
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
    this.state.hiders.push({
      key: 'zoe',
      position: {
        latitude: this.state.gameRegion.latitude + 0.0002,
        longitude: this.state.gameRegion.longitude - 0.0002,
      },
      fade: {
        level: 0.5,
        change: true,
      },
      photo: 'https://image.slidesharecdn.com/designhighlyavailableandsecuresystem-170405122608/95/design-highly-available-and-secure-system-23-638.jpg?cb=1491395239',
    });
    this.state.hiders.push({
      key: 'erick',
      position: {
        latitude: this.state.gameRegion.latitude + 0.00012,
        longitude: this.state.gameRegion.longitude + 0.0001,
      },
      fade: {
        level: 0.7,
        change: false,
      },
      photo: 'https://image.freepik.com/free-photo/brick-wall-corner_19-125294.jpg',
    });
    console.log(location);
    await this._intervalSetters();
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
    if (this.intervals) this.intervals.forEach((interval) => clearInterval(interval));
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
    if (this.state.timer.seconds <= 0) {
      this.setState({
        timer: {
          timeout: true,
        }
      });
      setTimeout(() => this.setState({ timer: { seconds: 10, timeout: false }, radius: this.state.radius - 20 }), 2000);
    } else {
      this.setState({
        timer: {
          seconds: this.state.timer.seconds - 1,
          timeout: false,
        }
      });
    }
  }

  convertTime() {
    let minutes = Math.floor(this.state.timer.seconds / 60);
    let seconds = ((this.state.timer.seconds - minutes) % 60).toString();
    return seconds.length === 1 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
  }

  render() {
    return (
      <View style={ styles.bg }>
        { this.state.region && this.state.userPosition ? (
          <MapView
            initialRegion={ this.state.region }
            onRegionChange={ (region) => this.onRegionChange(region) }
            provider={ PROVIDER_GOOGLE }
            customMapStyle={ MAP_STYLE }
            style={ styles.map }>
            {/* TODO: make relative to the latlon delta */}
              <View>
                <Circle
                  center={ this.state.gameRegion }
                  radius={ this.state.radius } 
                  fillColor="rgba(255,65,54,0.2)"
                  strokeColor="#FF4136"
                />
                <Circle
                  center={ this.state.userPosition }
                  radius={ this.state.radius * 0.02 } 
                  fillColor={ `rgba(255, 255, 255, ${ this.state.fade.level })` }
                  strokeColor="rgba(0, 0, 0, 0)"
                />
                <Hiders hiders={ this.state.hiders } radius={ this.state.radius } />
              </View>
          </MapView>) : (
          <Text style={ styles.loading }>Searching for children...</Text>
          )
        }
        <Text style={{ color: 'white', fontSize: 40, paddingTop: 430, textAlign: 'center', marginBottom: 30 }}>
          { (!this.state.timer.seconds) ? (
              `Round over!`
            ) : ((this.state.timer.seconds % 60).toString().length === 1 ? (
              `${Math.floor(this.state.timer.seconds / 60)}:0${this.state.timer.seconds % 60}`
              ) : (
                `${Math.floor(this.state.timer.seconds / 60)}:${this.state.timer.seconds % 60}`
              )
            )
          }
        </Text>
        { this.state.hiders.length > 0 &&
          <HiderLocations hiders={ this.state.hiders } navigation={ this.props.navigation }/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    textAlign: 'center',
    paddingTop: 200,
    fontSize: 36,
    color: 'white',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 400,
  },
  bg:{
    height: '100%',
    backgroundColor: 'black'
  }
});
