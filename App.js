/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import R from './components/routing';


const styles = StyleSheet.create({
  container: {
    flex: 3,
    // backgroundColor: '#F5FCFF',
  },
});

const App = () => (
  <View style={styles.container}>
    <R />
  </View>
);

export default App;

