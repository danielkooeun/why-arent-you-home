import React, { Component } from 'react';
import { AppRegistry, TextInput, Button, TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MapView, { PROVIDER_GOOGLE, Circle, AnimatedRegion, Animated } from 'react-native-maps';
import { Constants, Location, Permissions, Audio } from 'expo';

const MAP_STYLE = require('../../assets/mapStyle');
const latitudeDelta = 0.004;
const longitudeDelta = 0.005;

export default class Child extends Component {
  constructor (props) {
    super(props);
    this.state = {
      radius: 200,
      region: null,
      seeker: {
        position: {},
        fade: {},
      },
      gameRegion: null,
      position: null,
      fade: {
        level: 0.9,
        change: false,
      },
      updater: true,
      timer: {
        seconds: 15,
        timeout: false,
      },
    };
  }

  componentWillMount() {
    this._getLocationAsync();
  }

  componentDidMount() {
    Audio.setIsEnabledAsync(true);
    Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentLockedModeIOS: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
    this._askForAudioPermission();
  }

  _askForAudioPermission = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    });
    console.log("PERMISSION:", JSON.stringify(this.state.haveRecordingPermissions));
  };

  componentWillUnmount() {
    this._intervalDisablers();
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  onGameRegionChange(gameRegion) {
    this.setState({ gameRegion });
  }

  playSound = async () => {
    const ALARM = new Audio.sound();
    try {
      await ALARM.loadAsync(require('../../assets/alarm.mp3'));
      this.audioPlayer1  = ALARM;
      this.audioPlayer1.playAsync();
      // this.audioPlayer1.setPositionAsync(0);
      // this.audioPlayer1.setRateAsync(3, false);
    } catch (error) {
    // An error occurred!
    } 
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
    this.state.seeker.position = location.coords;
    this.state.seeker.fade = { level: 0.2, change: true };
    
    this.setState({
      position: {
        latitude: location.coords.latitude + 0.0002,
        longitude: location.coords.longitude - 0.0002,
      },
    });

    console.log(location);
    console.log(this.state.region);
    await this._intervalSetters();
  }

  _intervalSetters() {
    this.tracker = setInterval(this._getUserLocation, 1000);
    this.fader = setInterval(this._userFade.bind(null, this.state.fade), 100);
    this.counter = setInterval(this._countDown, 1000);
    this.seekerFader = setInterval(this._userFade.bind(null, this.state.seeker.fade), 100);
  }

  _intervalDisablers () {
    clearInterval(this.tracker);
    clearInterval(this.fader);
    clearInterval(this.seekerFader);
    clearInterval(this.counter);
  }

  _getUserLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      position: {
        latitude: location.coords.latitude + 0.0002,
        longitude: location.coords.longitude - 0.0002,
      },
    });
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

  render() {
    return (
      <View style={ styles.bg }>
        { this.state.region && this.state.position ? (
          <MapView
            initialRegion={ this.state.region }
            onRegionChange={ (region) => this.onRegionChange(region) }
            provider={ PROVIDER_GOOGLE }
            customMapStyle={ MAP_STYLE }
            style={ styles.map }>
            <View>
              <Circle
                center={ this.state.gameRegion }
                radius={ this.state.radius } 
                fillColor="rgba(255,65,54,0.2)"
                strokeColor="#FF4136"
              />
              <Circle
                center={ this.state.position }
                radius={ this.state.radius * 0.02 } 
                fillColor={ `rgba(250, 218, 94, ${ this.state.fade.level })` }
                strokeColor="rgba(0, 0, 0, 0)"
              />
              <Circle
                center={ this.state.seeker.position }
                radius={ this.state.radius * 0.02 } 
                fillColor={ `rgba(255, 255, 255, ${ this.state.seeker.fade.level })` }
                strokeColor="rgba(0, 0, 0, 0)"
              />
              </View>
          </MapView>
          ) : (
          <Text style={ styles.loading }>RUN AND HIDE!...</Text>
          )
        }
        <TouchableWithoutFeedback
          onPress={ () => console.log('asdf') }
        >
          <View>
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
          </View>
        </TouchableWithoutFeedback>
        <Button
          onPress={ () => this.props.navigation.navigate('start') }
          title="CAUGHT"
          color="red"
        />
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
  bg:{
    height: '100%',
    backgroundColor: 'black'
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