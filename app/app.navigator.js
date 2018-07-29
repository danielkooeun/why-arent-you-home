import React from 'react'
import { createStackNavigator } from 'react-navigation';
import StartScreen from './screens/start.screen';
import LoginScreen from './screens/login.screen';
import SeekerScreen from './screens/seeker.screen';
import LocationScreen from './screens/location.screen';

const start = {
  screen: StartScreen,
  navigationOptions: {
    header: null
  }
};

const login = {
  screen: LoginScreen,
  navigationOptions: {
    header: null
  }
};

const seeker = {
  screen: SeekerScreen,
  navigationOptions: {
    header: null
  }
};

const location = {
  screen: LocationScreen,
  navigationOptions: {
    header: null
  }
};

const AppNavigator = createStackNavigator(
  {
    login,
    start,
    seeker,
    location,
  },
  {
    initialRouteName: 'login',
  }
);

export default AppNavigator;