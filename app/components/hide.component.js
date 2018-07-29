import React, { Component } from 'react';
import { AppRegistry, TextInput, Button, TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class Hide extends Component {
  constructor (props) {
    super(props);
    this.state = {
      timer: {
        time: 45,
        timeout: false,
      }
    };
  }

  componentDidMount() {
    this.counter = setInterval(this.countDown, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.counter);
  }

  countDown = async () => {
    if (!this.state.timer.timeout)
      this.setState({ timer: {
        time: this.state.timer.time - 1,
        timeout: this.state.timer.timeout,
      }});
    if ( this.state.timer.time <= 0 ) {
      this.setState({timer: {
        time: 0,
        timeout: true,
      }});
      this.props.navigation.navigate('seeker');
    }
  }

  render() {
    return (
      <View
        style={ styles.bg }>
        <TouchableWithoutFeedback
          onPress={ () => this.props.navigation.navigate('child') }
        >
          <View>
            <Text style={{ paddingTop: 140, fontSize: 34, color: 'white' }}>RUN FROM HER!</Text>
          </View>
        </TouchableWithoutFeedback>
        <Text
          style={ styles.timer}>{this.state.timer.time} s</Text>
        <Button 
          color='red'
          title='Skip Timer'
          onPress={ () => this.props.navigation.navigate('seeker') }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timer: {
    color: 'white',
    padding: 10,
    paddingTop: 40,
    paddingBottom: 100,
    textAlign: 'center',
    fontSize: 36
  },
  bg:{
    padding: 50,
    height: '100%',
    backgroundColor: 'black'
  }
})