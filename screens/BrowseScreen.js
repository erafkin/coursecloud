import React, { Component } from 'react';
import {
  Text, TouchableHighlight, View, StyleSheet,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Table, Row,
} from 'react-native-table-component';
import DropDownPicker from 'react-native-dropdown-picker';
import MultiSelect from 'react-native-multiple-select';
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

  setCourse = (c) => {
    this.setState({
      course: c,
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

  clearTarget = () => {
    this.setState({
      targets: undefined,
    });
  }

  nlp = () => {
    const { subject, course, targets } = this.state;
    console.log(targets);
    axios.post('http://localhost:3030/api/nlp', { subject, course, targets }).then((response) => {
      console.log(response.data.resp);
      this.setState({
        nlpResponse: JSON.stringify(response.data.resp),
      });
    });
  }

  getCourseValues = () => {
    let courses;
    const { subject } = this.state;

    switch (subject) {
      case 'ECON':
        courses = [
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '5', value: '5' },
          { label: '10', value: '10' },
          { label: '20', value: '20' },
          { label: '21', value: '21' },
          { label: '22', value: '22' },
          { label: '24', value: '24' },
          { label: '25', value: '25' },
        ];
        return courses;
      case 'GOVT':
        courses = [
          { label: '3', value: '3' },
          { label: '4', value: '4' },
          { label: '5', value: '5' },
          { label: '10', value: '10' },
          { label: '16', value: '16' },
          { label: '18', value: '18' },
        ];
        return courses;
      case 'ENGS':
        courses = [
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '8', value: '8' },
          { label: '11', value: '11' },
          { label: '12', value: '12' },
          { label: '20', value: '20' },
          { label: '21', value: '21' },
          { label: '22', value: '22' },
          { label: '24', value: '24' },
          { label: '25', value: '25' },
        ];
        return courses;
      case 'PSYC':
        courses = [
          { label: '1', value: '1' },
          { label: '6', value: '6' },
          { label: '10', value: '10' },
          { label: '11', value: '11' },
          { label: '28', value: '28' },
          { label: '35', value: '35' },
          { label: '36', value: '36' },
          { label: '37', value: '37' },
          { label: '38', value: '38' },
        ];
        return courses;
      case 'COSC':
        courses = [
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '10', value: '10' },
          { label: '11', value: '11' },
          { label: '16', value: '16' },
          { label: '22', value: '22' },
          { label: '24', value: '24' },
        ];
        return courses;
      default:
        courses = [];
        return courses;
    }
  }

  dropdownPicker = () => {
    return (
      <View style={{
        display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 130, marginTop: 50,
      }}
      >
        <DropDownPicker
          items={[
            { label: 'Economics', value: 'ECON' },
            { label: 'Government', value: 'GOVT' },
            { label: 'Engines', value: 'ENGS' },
            { label: 'Neuroscience', value: 'PSYC' },
            { label: 'Computer Science', value: 'COSC' },
          ]}
          defaultNull
          placeholder="Select Department"
          containerStyle={{ height: 'auto' }}
          onChangeItem={(subj) => this.setSubject(subj.value)}
        />
        <DropDownPicker
          items={this.getCourseValues()}
          defaultNull
          placeholder="Select Course Number"
          containerStyle={{ height: 'auto' }}
          onChangeItem={(c) => this.setCourse(c.value)}
        />
      </View>
    );
  }


    getTargetOptions = () => {
      const options = [
        { label: 'Time', value: 'time' },
        { label: 'Difficulty', value: 'difficulty' },
        { label: 'Lecture Based', value: 'decture' },
        { label: 'Discussion Based', value: 'discussion' },
        { label: 'Influence on Dartmouth Career', value: 'influence' },
      ];
      //   const { targets } = this.state;
      return (
        <View style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 150, marginTop: 25,
        }}
        >
          <DropDownPicker
            items={options}
            defaultNull
            placeholder="Select Focus Area"
            containerStyle={{ height: 'auto' }}
            onChangeItem={(t) => this.setTarget(t.value)}
          />
        </View>


      );
    }

  keywordTable = (kword) => {
    const style = StyleSheet.create({
      container: {
        flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff',
      },
      head: { height: 40, backgroundColor: '#f1f8ff' },
      wrapper: { flexDirection: 'row' },
      title: { flex: 1, backgroundColor: '#f6f8fa' },
      row: { height: 'auto' },
      dataWrapper: { marginTop: -1 },
      text: { textAlign: 'center' },
    });
    return (
      <View style={style.container}>
        <Table>
          <Row data={['Keyword', 'Relevance', 'Sentiment']} flexArr={[1, 1, 1]} style={style.head} textStyle={style.text} />
          <ScrollView style={style.dataWrapper}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              {/* <Col data={[1, 2, 3, 4, 5]} style={style.title} heightArr={[28, 28]} textStyle={style.text} /> */}
              {kword.keywords.map((word, i) => {
                const k = `${i}_key`;
                return (
                  <Row key={k} data={[word.text, word.relevance, word.sentiment.label]} flexArr={[1, 1, 1]} style={style.row} textStyle={style.text} widthArr={[110, 110, 110]} />
                );
              })}
            </Table>
          </ScrollView>
        </Table>
      </View>
    );
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
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          {this.dropdownPicker()}
          {this.getTargetOptions()}
          <View>
            <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', flexWrap: 'wrap' }}>
              <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject(course, undefined); }}><Text style={styles.buttonWords}>Clear Subject</Text></TouchableHighlight>
              <TouchableHighlight style={styles.courseButton} onPress={() => { this.setCourseAndSubject(undefined, subject); }}><Text style={styles.buttonWords}>Clear Course</Text></TouchableHighlight>
              <TouchableHighlight style={styles.courseButton} onPress={() => { this.clearTarget(); }}><Text style={styles.buttonWords}>Clear Focus</Text></TouchableHighlight>
            </View>
            <View>
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
                {console.log(targets)}
                {': '}
                {targets ? targets.map((t) => { return `${t}, `; }) : <View /> }
              </Text>
            </View>
            <View style={{
              marginTop: 10, marginBottom: 15, justifyContent: 'space-evenly', flexDirection: 'row', flexWrap: 'wrap',
            }}
            >
              <TouchableHighlight style={styles.subjectButton} onPress={() => { this.nlp(); }}><Text style={styles.buttonGo}>Go!</Text></TouchableHighlight>
            </View>
            <Text style={{ fontSize: 16, fontWeight: '700' }}> Results: </Text>
            {nlp.map((doc) => {
              if (typeof doc === 'object') {
                const k = `${doc.course}_key`;
                return (
                  <View style={{ flexDirection: 'column' }}>
                    <Text key={k}>
                      The general sentiment for
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
                      {' '}
                      on a scale from -1 to 1
                      {'. '}
                      {doc.sentiment.targets
                        ? doc.sentiment.targets.map((target) => {
                          const key = `${target.text}_key`;
                          return (
                            <Text key={key}>
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
                              {'.'}
                            </Text>
                          );
                        }) : <View />}
                    </Text>
                    <Text>
                      Below are the top 5 relevant keywords found within the course reviews, followed by their sentiments:
                    </Text>
                    {doc.keywords ? this.keywordTable(doc) : <View />}
                  </View>
                );
              } else {
                return (<View />);
              }
            })}
          </View>

        </View>

      </ScrollView>
    );
  }
}
export default BrowseScreen;
