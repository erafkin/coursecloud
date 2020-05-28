import React, { Component } from 'react';
import {
  Text, TouchableHighlight, TextInput, View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axois from 'axios';
import styles from '../styles/style';

class ChatbotScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionId: '',
      messages: [],
      currMessage: '',
    };
  }

  startNewSession = () => {
    axois.get('http://localhost:3030/api/chatbot/session').then((response) => {
      this.setState({ sessionId: response.data });
    }).catch((error) => {
      console.log(error);
    });
  }

  handleMessage = (m, user) => {
    const { messages } = this.state;
    messages.push({ message: m, fromWatson: (user !== 'client'), key: messages.length });
    this.setState({
      messages,
    });
  }

  messageAPI = (message) => {
    const testSessionID = 'c010ea64-570d-416c-898d-93c69421cd59';
    axois.post('http://localhost:3030/api/chatbot/message', { sessionId: testSessionID, text: message })
      .then((response) => {
        this.handleMessage(response.data.response.output.generic[0].text, 'watson');
      });
  }

  changeMessage = (text) => {
    this.setState({
      currMessage: text,
    });
  }

  messageScreen = () => {
    const { messages } = this.state;
    if (messages.length === 0) {
      return <Text>no messages</Text>;
    } else {
      return (
        <ScrollView style={{ maxHeight: 430, backgroundColor: 'blue' }}>
          {this.indivMessage(messages)}
        </ScrollView>
      );
    }
  }

  indivMessage = (messages) => {
    return (messages.map((mes) => {
      console.log(mes);
      return mes.fromWatson
        ? (
          <View style={styles.watsonMessageContainer} key={mes.key}>
            <View style={styles.watsonMessage}>
              <Text style={styles.watsonMessageWords}>
                {mes.message}
              </Text>
            </View>
          </View>
        )
        : (
          <View style={styles.clientMessageContainer} key={mes.key}>
            <View style={styles.clientMessage}>
              <Text style={styles.clientMessageWords}>
                {mes.message}
              </Text>
            </View>
          </View>
        );
    })
    );
  }


  render() {
    const {
      currMessage, sessionId,
    } = this.state;
    if (sessionId === '') {
      return (
        <ScrollView>
          <TouchableHighlight onPress={() => { this.startNewSession(); }} style={styles.newSession}>
            <Text style={styles.newSessionWords}> Start a conversation!</Text>
          </TouchableHighlight>
        </ScrollView>
      );
    } else {
      return (
        <View style={{ flexDirection: 'column', height: '100%' }}>
          {this.messageScreen()}
          <View style={styles.chatbotInput}>
            <TextInput
              style={{
                height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingLeft: 10,
              }}
              onChangeText={(text) => this.changeMessage(text)}
              placeholder="type here"
              value={currMessage}
            />
            <TouchableHighlight onPress={() => { this.handleMessage(currMessage, 'client'); this.messageAPI(currMessage); }} style={styles.courseButton}>
              <Text style={styles.buttonWords}> send</Text>
            </TouchableHighlight>
          </View>


        </View>
      );
    }
  }
} export default ChatbotScreen;
