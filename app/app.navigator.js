import React from 'react'
import { createStackNavigator } from 'react-navigation';
import StartScreen from './screens/start.screen';
import LoginScreen from './screens/login.screen';
import SeekerScreen from './screens/seeker.screen';
import HideScreen from './screens/hide.screen';


const start = {
  screen: StartScreen,
  navigationOptions:{
    header: null
  }
};

const login = {
  screen: LoginScreen,
  navigationOptions:{
    header: null
  }
};

const seeker = {
  screen: SeekerScreen,
  navigationOptions:{
    header: null
  }
};

const hide = {
  screen: HideScreen,
  navigationOptions:{
    header: null
  }
};

const AppNavigator = createStackNavigator(
  {
    login: login,
    start: start,
    seeker: seeker,
    hide: hide
  },
  {
    initialRouteName: 'login',
  }
);

export default AppNavigator;