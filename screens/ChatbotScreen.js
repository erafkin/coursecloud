import React, { Component } from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class ChatbotScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <ScrollView>
        <Text>Chatbot</Text>
      </ScrollView>
    );
  }
} export default ChatbotScreen;
