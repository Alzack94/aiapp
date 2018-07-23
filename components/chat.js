import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import React from 'react';
import {
  KeyboardAvoidingView, 
  Platform,
  StyleSheet,
  Text,
  View, AsyncStorage, Alert,
} from 'react-native';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import Tts from 'react-native-tts';

import dialogflowConfig from '../chatbot-48397-4b38bfb733d7.json';
import robo from '../images/robo.jpg';
import user_icon from '../images/user.jpg';


class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      result: '',
    };

    this.onSend = this.onSend.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.localStorage = this.localStorage.bind(this);
    this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);

    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH,
      dialogflowConfig.project_id,
    );
  }

  componentDidMount() {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, func) => {
        func.map((result, i, store) => {
        // get at each store's key/value so you can work with it
          let key = store[i][0];
          let value = store[i][1];
          if (value) {
            this.setState((previousState) => {
              return {
                messages: GiftedChat.append(previousState.messages, JSON.parse(value)),
              };
            });
          }
        });
      });
    }).catch(error => {
      console.log(error);
    });
  }


  onSend(messages = []) {
    this.answerDemo(messages);
    this.localStorage(messages);
    let text = this.capitalizeFirstLetter(messages[0].text);
    messages[0].text = text;
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  capitalizeFirstLetter(string) {
    this.funcName = 'capitalizeFirstLetter';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  answerDemo(messages) {
    let query = messages[0].text;
    if (messages.length > 0) {
      Dialogflow_V2.requestQuery(query, result => {this.setState({ result: JSON.stringify(result)}); this.handleResponse(this.state.result)}, error => {
        this.setState({ result: JSON.stringify(error) });
        Alert.alert(
        // This is Alert Dialog Title
          'CONNECTION PROBLEM',
          // This is Alert Dialog Message.
          'You are offline',
          [
          // First Text Button in Alert Dialog.
            { text: 'START CHATTING', onPress: () => this.props.navigation.navigate('Home') },
          ],
        );
      }
    );
    }
    else {
      Alert.alert('Not found');
    }
  }

  handleResponse(res) {
    // let resjson = JSON.stringify(res);
    let json = JSON.parse(res);
    // Alert.alert(res);
    let speech = this.capitalizeFirstLetter(json.queryResult.fulfillmentMessages[0].text.text[0]);
    let obj = [{
      text: speech,
      user: {
        _id: 2,
        name: 'Robo',
        avatar: robo,
      },
      createdAt: new Date(),
      _id: Math.round(Math.random() * 1000000),
    }];
    this.localStorage(obj);

    Tts.getInitStatus().then(() => {
      // Tts.setDefaultVoice('com.apple.ttsbundle.Samantha-compact');
      Tts.setDefaultLanguage('en-IE');
      Tts.setDucking(true);
      Tts.speak(json.queryResult.fulfillmentMessages[0].text.text[0]);
    }, (err) => {
      if (err.code === 'no_engine') {
        Tts.requestInstallEngine();
      }
    });

    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, obj),
      };
    });


  }

  localStorage(data) {
    this.funcName = ' localStorage';
    AsyncStorage.setItem(JSON.stringify(new Date().getTime()), JSON.stringify(data));
  }


  renderBubble(props) {
    this.funcName = ' renderBubble';
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#A3E47D',
          },
        }}
      />
    );
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}

        user={{
          _id: 1, avatar: user_icon, // sent messages should have same user._id
        }}
        renderBubble={this.renderBubble}
      />
    );
  }
}


export default Chat;
