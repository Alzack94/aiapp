import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';

import HomeScreen from './Home';
import ChatUI from './chat_ui';
import SystemSettings from '../SystemSettings';
import Calc from '../Calc';


const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    chat: {
      screen: ChatUI,
    },
    setting: {
      screen: SystemSettings,
    },
    calculator: {
      screen: Calc,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'chat',
  },
);


class R extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return <RootStack />;
  }
}

export default R;
