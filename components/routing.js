import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
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
    initialRouteName: 'Home',
  },
);


const R = () => (
  <RootStack />
);

export default R;
