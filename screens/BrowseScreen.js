import React, { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

class BrowseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: undefined,
      course: undefined,
      targets: undefined,
      nlpResponse: undefined,
    };
  }

  setSubject = (subj) => {
    const { subject } = this.state;
    if (subject === subj) {
      this.setState({
        subject: undefined,
      });
    } else {
      this.setState({
        subject: subj,
      });
    }
  }

  setCourse = (c) => {
    const { course } = this.state;
    if (course === c) {
      this.setState({
        course: undefined,
      });
    } else {
      this.setState({
        course: c,
      });
    }
  }

  setTarget = (tar) => {
    const { targets } = this.state;
    const newTargets = [];
    let found = false;
    if (targets !== undefined) {
      for (let i = 0; i < targets.length; i++) {
        if (targets[i] !== tar) {
          newTargets.push(targets[i]);
        } else {
          found = true;
        }
      }
    }

    if (!found) {
      newTargets.push(tar);
    }
    if (newTargets === []) {
      this.setState({
        targets: undefined,
      });
    } else {
      this.setState({
        targets: newTargets,
      });
    }
  }

  nlp = () => {
    const { subject, course, targets } = this.state;
    axios.post('http://localhost:3030/api/nlp', { subject, course, targets }).then((response) => {
      console.log(response.data);
      this.setState({
        nlpResponse: JSON.stringify(response.data),
      });
    });
  }

  render() {
    const {
      subject, course, targets, nlpResponse,
    } = this.state;
    return (
      <ScrollView>
        <View style={{ flexDirection: 'column' }}>
          <TouchableHighlight onPress={() => { this.setSubject('ECON'); }}><Text>Economics</Text></TouchableHighlight>
          <View style={{ flexDirection: 'row' }}>
            <TouchableHighlight onPress={() => { this.setCourse('1'); }}><Text>1</Text></TouchableHighlight>

          </View>
          <TouchableHighlight onPress={() => { this.setSubject('GOV'); }}><Text>Government</Text></TouchableHighlight>
          <TouchableHighlight onPress={() => { this.setSubject('PSYC'); }}><Text>Psychology</Text></TouchableHighlight>
          <TouchableHighlight onPress={() => { this.setSubject('COSC'); }}><Text>Computer Science</Text></TouchableHighlight>
          <TouchableHighlight onPress={() => { this.setSubject('ENGS'); }}><Text>Engineering</Text></TouchableHighlight>
          <Text>I care about: </Text>
          <TouchableHighlight onPress={() => { this.setTarget('time'); }}><Text>Time</Text></TouchableHighlight>
          <TouchableHighlight onPress={() => { this.setTarget('difficult'); }}><Text>Difficulty</Text></TouchableHighlight>
          <TouchableHighlight onPress={() => { this.setTarget('lecture'); }}><Text>Lecture Based</Text></TouchableHighlight>
          <TouchableHighlight onPress={() => { this.setTarget('discussion'); }}><Text>Discussion based</Text></TouchableHighlight>
          <TouchableHighlight onPress={() => { this.setTarget('influence'); }}><Text>Influence on my Dartmouth career</Text></TouchableHighlight>
          <TouchableHighlight onPress={() => { this.nlp(); }}><Text>Go!</Text></TouchableHighlight>
          <Text>
            Subject selected
            {': '}
            {subject}
          </Text>
          <Text>
            Course selected
            {': '}
            {course}
          </Text>
          <Text>
            I care about
            {': '}
            {targets}
          </Text>

          <Text>
            Results
            {': '}
            {nlpResponse}
          </Text>

        </View>

      </ScrollView>
    );
  }
}
export default BrowseScreen;
