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
      this.setState({
        sessionId: response.data.response.session_id,
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  handleMessage = (m, user) => {
    const { messages } = this.state;
    messages.push({ message: m, fromWatson: (user !== 'client'), key: messages.length });
    this.setState({
      currMessage: '',
      messages,
    });
  }

  messageAPI = (message, sessionId) => {
    console.log(sessionId);
    // const testSessionID = '0e1735ab-b40e-4839-8d9f-0e4ee99b8104';
    axois.post('http://localhost:3030/api/chatbot/message', { sessionId, message })
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
      return <View />;
    } else {
      return (
        <ScrollView style={{ maxHeight: 430 }} ref={(component) => { this._scrollView = component; }} onContentSizeChange={() => this._scrollView.scrollToEnd({ animated: true })}>
          {this.indivMessage(messages)}
        </ScrollView>
      );
    }
  }

  indivMessage = (messages) => {
    return (messages.map((mes) => {
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
            <TouchableHighlight onPress={() => { this.handleMessage(currMessage, 'client'); this.messageAPI(currMessage, sessionId); }} style={styles.courseButton}>
              <Text style={styles.buttonWords}> send</Text>
            </TouchableHighlight>
          </View>


        </View>
      );
    }
  }
} export default ChatbotScreen;
