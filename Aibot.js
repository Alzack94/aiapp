import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import dialogflowConfig from './chatbot-48397-4b38bfb733d7.json';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

});


export default class AiBot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: '',
      listeningState: 'not started',
      audioLevel: 0,
    };
    
    // Dialogflow.setConfiguration(
    //   '3242_your_token_2344454', Dialogflow.LANG_ENGLISH,
    // );
    
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH,
      dialogflowConfig.project_id,
    );

    // const contexts = [{
    //   "name": "deals",
    //   "lifespan": 1,
    //   "parameters": {
    //     "name": "Sam"
    //   }
    // }];


    // Dialogflow.setContexts(contexts);
    // Dialogflow_V2.setContexts(contexts);


    // const permanentContexts = [{
    //   "name": "config",
    //   "parameters": {
    //     "access_token": "42 yo 42 tiny rick"
    //   }
    // }];


    // Dialogflow.setPermanentContexts(permanentContexts);
    // Dialogflow_V2.setPermanentContexts(permanentContexts);


    // const entities = [{
    //   "name": "shop",
    //   "extend": true,
    //   "entries": [
    //     {
    //       "value": "Media Markt",
    //       "synonyms": [
    //         "Media Markt",
    //       ]
    //     }
    //   ]
    // }];


    // Dialogflow.setEntities(entities);
    // Dialogflow_V2.setEntities(entities);
  }


  render() {
    // Dialogflow.requestEvent("WELCOME", null, r => console.log(r), e => console.log(e));
    // Dialogflow_V2.requestEvent("WELCOME", null, r => console.log(r), e => console.log(e));


    return (
      <View style={styles.container}>

        <View style={{ flex: 4 }}>
          <Text>{"Listening State: " + this.state.listeningState}</Text>
          <Text>{"Audio Level: " + this.state.audioLevel}</Text>
          <Text>{"Result: " + this.state.result}</Text>
        </View>
        <View style={{ flex: 1, padding: 10 }}>
          {/* <Button title="Start Listening" onPress={() => {


            // V1
            Dialogflow.onListeningStarted(() => {
              this.setState({ listeningState: "started" });
            });

            Dialogflow.onListeningCanceled(() => {
              this.setState({ listeningState: "canceled" });
            });

            Dialogflow.onListeningFinished(() => {
              this.setState({ listeningState: "finished" });
            });

            Dialogflow.onAudioLevel(level => {
              this.setState({ audioLevel: level });
            });

            Dialogflow.startListening(result => {
              console.log(result);
              this.setState({ result: JSON.stringify(result) });
            }, error => {
              this.setState({ result: JSON.stringify(error) });
            });
          }} /> */}

          <Button color="orange" title="Start Listening V2" onPress={() => {
            // V2
            Dialogflow_V2.onListeningStarted(() => {
              this.setState({ listeningState: "started" });
            });

            Dialogflow_V2.onListeningCanceled(() => {
              this.setState({ listeningState: "canceled" });
            });

            Dialogflow_V2.onListeningFinished(() => {
              this.setState({ listeningState: "finished" });
            });

            Dialogflow_V2.onAudioLevel((level) => {
              this.setState({ audioLevel: level });
            });
          
            Dialogflow_V2.startListening((result) => {
              console.log(result);
              this.setState({ result: JSON.stringify(result) });
            }, (error) => {
              this.setState({ result: JSON.stringify(error) });
            });
          }}
          />
          <Button color="orange" title="Start Listening V2" onPress={() => {
           Dialogflow_V2.requestQuery("call me hari", result => this.setState({ result: JSON.stringify(result), audioLevel: Dialogflow_V2.accessToken }), error => this.setState({ result: JSON.stringify(error) }));
          }}
          />
        </View>
      </View>
    );
  }
}
