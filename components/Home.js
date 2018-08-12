import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Icon, Button, Card } from 'react-native-elements';
import chat from '../images/chat.png';
import robo from '../images/robo.jpg';
import bot from '../images/bot.jpg';
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
    {/* <Card
      image={require('../images/splash.jpg')}
      style={styles.image}
      containerStyle={styles.container}
    >
      <Button
        large
        raised
        icon={{ name: 'comments-o', type: 'font-awesome', color: 'black' }}
        backgroundColor="orange"
        title="START CHATTING"
        borderRadius={30}
        onPress={() => navigate('chat')}
      />
      <Image style={{ borderRadius: 70, width: 140, height: 140 }} source={bot} />
    </Card> */}
    <Image style={styles.home} source={splash} />
    {/* <Button
      small
      raised
      icon={{ name: 'comments-o', type: 'font-awesome', color: 'black' }}
      backgroundColor="orange"
      title="Go to Chat"
      borderRadius={30}
      onPress={() => navigate('chat')}
    /> */}
  </View>
    );
  }
}

export default HomeScreen;
