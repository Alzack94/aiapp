import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import splash from '../images/splash.jpg';

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 400,
  },
  container: {
    backgroundColor: 'black',
  },
  home: {
    backgroundColor: 'black',
    width: 400,
    height: 400,
  },
});

class HomeScreen extends React.Component {
  componentWillUnmount() {
    clearTimeout(this.timeoutHandle); 
    // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
  }
  async screentime() {
    this.timeoutHandle = setTimeout(() => {
      // Add your logic for the transition
      this.props.navigation.navigate('chat');
    }, 1000);
  }
  render() {
    const { navigate } = this.props.navigation;
    this.screentime();
    return (
  <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }} >

    <Image style={styles.home} source={splash} />
  </View>
    );
  }
}

export default HomeScreen;
