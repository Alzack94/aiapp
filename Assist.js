import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  Alert,
  ToastAndroid,
  KeyboardAvoidingView,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import SpeechAndroid from 'react-native-android-voice';
import Tts from 'react-native-tts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    flex: 1,
  },
  send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },
  message: {
    fontSize: 18,
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10,
  },
  row: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rowText: {
    flex: 1,
  },
});

class Assist extends Component {
  constructor(props) {
    super(props);
    this.onSpeak = this.onSpeak.bind(this);
    this.onPressButton = this.onPressButton.bind(this);
    this.getDialogFlow = this.getDialogFlow.bind(this);
    this.renderItem = this.renderItem.bind(this);
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

  renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.rowText}>
        <Text style={styles.sender}>{item.key}</Text>
        <Text style={styles.message}>{item.key}</Text>
      </View>
    </View>
  );


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
        <FlatList
          data={[{ key: 'a' }, { key: 'b' }]}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
        <FlatList
          data={[{ key: 'a' }, { key: 'b' }]}
          renderItem={this.renderItem}
          inverted
        />
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.footer}>
            <TextInput
              value={this.state.showText}
              onChangeText={(text) => { this.setState({ showText: text }); }}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Type something nice"
            />
            <TouchableOpacity onPress={this.sendMessage}>
              <Text style={styles.send}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onSpeak}>
              <Text style={styles.send}>Voice</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
