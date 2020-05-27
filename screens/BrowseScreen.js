import React, { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import styles from '../styles/style';

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

  setCourseAndSubject = (c, subj) => {
    this.setState({
      course: c,
      subject: subj,
    });
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
      console.log(response.data.resp);
      this.setState({
        nlpResponse: JSON.stringify(response.data.resp),
      });
    });
  }

  render() {
    const {
      subject, course, targets, nlpResponse,
    } = this.state;
    let nlp = [];
    if (nlpResponse !== undefined) nlp = JSON.parse(nlpResponse);
    console.log(nlp);
    return (
      <ScrollView>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{
            fontSize: 16, fontWeight: '700', margin: '5%', textAlign: 'left',
          }}
          >
            Browse courses
          </Text>
          <TouchableHighlight style={styles.subjectButton} onPress={() => { this.setCourseAndSubject(undefined, 'ECON'); }}><Text style={styles.buttonWords}>Economics</Text></TouchableHighlight>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('1', 'ECON'); }}><Text style={styles.buttonWords}>1</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('2', 'ECON'); }}><Text style={styles.buttonWords}>2</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('5', 'ECON'); }}><Text style={styles.buttonWords}>5</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('10', 'ECON'); }}><Text style={styles.buttonWords}>10</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('20', 'ECON'); }}><Text style={styles.buttonWords}>20</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('21', 'ECON'); }}><Text style={styles.buttonWords}>21</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('22', 'ECON'); }}><Text style={styles.buttonWords}>22</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('24', 'ECON'); }}><Text style={styles.buttonWords}>24</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('25', 'ECON'); }}><Text style={styles.buttonWords}>20</Text></TouchableHighlight>
          </View>
          <TouchableHighlight style={styles.subjectButton} onPress={() => { this.setCourseAndSubject(undefined, 'GOV'); }}><Text style={styles.buttonWords}>Government</Text></TouchableHighlight>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('3', 'GOV'); }}><Text style={styles.buttonWords}>3</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('4', 'GOV'); }}><Text style={styles.buttonWords}>4</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('5', 'GOV'); }}><Text style={styles.buttonWords}>5</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('10', 'GOV'); }}><Text style={styles.buttonWords}>10</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('16', 'GOV'); }}><Text style={styles.buttonWords}>16</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('18', 'GOV'); }}><Text style={styles.buttonWords}>18</Text></TouchableHighlight>
          </View>
          <TouchableHighlight style={styles.subjectButton} onPress={() => { this.setCourseAndSubject(undefined, 'PSYC'); }}><Text style={styles.buttonWords}>Psychology</Text></TouchableHighlight>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('1', 'PSYC'); }}><Text style={styles.buttonWords}>1</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('6', 'PSYC'); }}><Text style={styles.buttonWords}>6</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('10', 'PSYC'); }}><Text style={styles.buttonWords}>10</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('11', 'PSYC'); }}><Text style={styles.buttonWords}>11</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('28', 'PSYC'); }}><Text style={styles.buttonWords}>28</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('35', 'PSYC'); }}><Text style={styles.buttonWords}>35</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('36', 'PSYC'); }}><Text style={styles.buttonWords}>36</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('37', 'PSYC'); }}><Text style={styles.buttonWords}>37</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('38', 'PSYC'); }}><Text style={styles.buttonWords}>38</Text></TouchableHighlight>
          </View>
          <TouchableHighlight style={styles.subjectButton} onPress={() => { this.setCourseAndSubject(undefined, 'COSC'); }}><Text style={styles.buttonWords}>Computer Science</Text></TouchableHighlight>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('1', 'COSC'); }}><Text style={styles.buttonWords}>1</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('2', 'COSC'); }}><Text style={styles.buttonWords}>2</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('10', 'COSC'); }}><Text style={styles.buttonWords}>10</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('11', 'COSC'); }}><Text style={styles.buttonWords}>11</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('16', 'COSC'); }}><Text style={styles.buttonWords}>16</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('22', 'COSC'); }}><Text style={styles.buttonWords}>22</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('24', 'COSC'); }}><Text style={styles.buttonWords}>24</Text></TouchableHighlight>
          </View>
          <TouchableHighlight style={styles.subjectButton} onPress={() => { this.setCourseAndSubject(undefined, 'ENGS'); }}><Text style={styles.buttonWords}>Engineering</Text></TouchableHighlight>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('2', 'ENGS'); }}><Text style={styles.buttonWords}>2</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('3', 'ENGS'); }}><Text style={styles.buttonWords}>3</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('8', 'ENGS'); }}><Text style={styles.buttonWords}>8</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('11', 'ENGS'); }}><Text style={styles.buttonWords}>11</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('12', 'ENGS'); }}><Text style={styles.buttonWords}>12</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('20', 'ENGS'); }}><Text style={styles.buttonWords}>20</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('21', 'ENGS'); }}><Text style={styles.buttonWords}>21</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('22', 'ENGS'); }}><Text style={styles.buttonWords}>22</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('24', 'ENGS'); }}><Text style={styles.buttonWords}>24</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject('25', 'ENGS'); }}><Text style={styles.buttonWords}>25</Text></TouchableHighlight>
          </View>
          <Text style={{
            fontSize: 16, fontWeight: '700', margin: '5%', textAlign: 'left',
          }}
          >
            I care about:
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setTarget('time'); }}><Text style={styles.buttonWords}>Time</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setTarget('difficult'); }}><Text style={styles.buttonWords}>Difficulty</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setTarget('lecture'); }}><Text style={styles.buttonWords}>Lecture Based</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setTarget('discussion'); }}><Text style={styles.buttonWords}>Discussion based</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setTarget('influence'); }}><Text style={styles.buttonWords}>Influence on my Dartmouth career</Text></TouchableHighlight>
          </View>
          <Text style={{
            fontSize: 16, fontWeight: '700', margin: '5%', textAlign: 'left',
          }}
          >
            Clear
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject(course, undefined); }}><Text style={styles.buttonWords}>Subject</Text></TouchableHighlight>
            <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject(undefined, subject); }}><Text style={styles.buttonWords}>course</Text></TouchableHighlight>
          </View>

          <Text style={{ fontSize: 16, fontWeight: '700' }}>
            Subject selected
            {': '}
            {subject}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: '700' }}>
            Course selected
            {': '}
            {course}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: '700' }}>
            I care about
            {': '}
            {targets}
          </Text>
          <TouchableHighlight style={styles.subjectButton} onPress={() => { this.nlp(); }}><Text style={styles.buttonWords}>Go!</Text></TouchableHighlight>
          <Text> Results</Text>
          {nlp.map((doc) => {
            if (typeof doc === 'object') {
              return (
                <Text key={doc.course}>
                  Overall sentiment for
                  {' '}
                  {doc.course}
                  {' '}
                  was
                  {' '}
                  {doc.sentiment.document.label}
                  {' '}
                  with a score of
                  {' '}
                  {doc.sentiment.document.score}
                  {'. '}
                  {doc.sentiment.targets.map((target) => {
                    return (
                      <Text key={target.text}>
                        People felt that the
                        {' '}
                        {target.text}
                        {' '}
                        of the class was
                        {' '}
                        {target.label}
                        {' '}
                        with a score of
                        {' '}
                        {target.score}
                      </Text>
                    );
                  })}
                </Text>
              );
            } else {
              return (<View />);
            }
          })}

        </View>

      </ScrollView>
    );
  }
}
export default BrowseScreen;
