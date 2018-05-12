import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  Alert,
  ToastAndroid,
  View,
} from 'react-native';
import SpeechAndroid from 'react-native-android-voice';
import Tts from 'react-native-tts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

class Assist extends Component {
  constructor(props) {
    super(props);
    this.onSpeak = this.onSpeak.bind(this);
    this.onPressButton = this.onPressButton.bind(this);
    this.getDialogFlow = this.getDialogFlow.bind(this);
    this.state = { showText: null };
    this.state = { text: null };
  }

  async onSpeak() {
    try {
      const spokenText = await SpeechAndroid.startSpeech('talk to Ultron', SpeechAndroid.ENGLISH);
      this.setState({
        showText: spokenText,
      });
      const dialogflowResponse = await this.getDialogFlow(spokenText);
      if (this.state.showText) {
        Tts.speak(dialogflowResponse.result.fulfillment.speech);
        ToastAndroid.show(dialogflowResponse.result.fulfillment.speech, ToastAndroid.LONG);
      }
    } catch (error) {
      switch (error) {
        case SpeechAndroid.E_VOICE_CANCELLED:
          ToastAndroid.show('Voice Recognizer cancelled', ToastAndroid.LONG);
          break;
        case SpeechAndroid.E_NO_MATCH:
          ToastAndroid.show('No match for what you said', ToastAndroid.LONG);
          break;
        case SpeechAndroid.E_SERVER_ERROR:
          ToastAndroid.show('Google Server Error', ToastAndroid.LONG);
          break;
        default:
          break;
      }
    }
  }

  async onPressButton() {
    this.message = 'You tapped the button';
    Tts.speak(this.message);
    Alert.alert(this.message);
  }

  async getDialogFlow(msg) {
    const ACCESS_TOKEN = '';

    try {
      const response = await fetch('https://api.dialogflow.com/v1/query?v=20170712', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', Authorization: 'Bearer '.concat(ACCESS_TOKEN),
        },
        body: JSON.stringify({
          query: msg,
          lang: 'EN',
          sessionId: 'somerandomthing',
        }),
      });
      const responseJson = await response.json();
      this.setState({
        showText: responseJson.result.fulfillment.speech,
      });
      return responseJson;
    } catch (error) {
      // console.error(error);
    }
    return 1;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.showText} </Text>
        <Text>{this.state.text} </Text>
        <Button
          onPress={this.onSpeak}
          title="Press to talk"
          color="#37B6DF"
          accessibilityLabel="Press to talk"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => { this.setState({ text }); }}
          value={this.state.text}
        />
        <Button
          onPress={this.onPressButton}
          title="Press to disp"
          color="#37B6DF"
          accessibilityLabel="Press to talk"
        />

      </View>
    );
  }
}

export default Assist;
