import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './Home';
import ChatUI from './chat_ui';


const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    chat: {
      screen: ChatUI,
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
