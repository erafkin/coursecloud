import React, { Component } from 'react';
import {
  Text, TouchableHighlight, View, StyleSheet,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Table, TableWrapper, Row, Col,
} from 'react-native-table-component';
import DropDownPicker from 'react-native-dropdown-picker';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import axios from 'axios';
import styles from '../styles/style';

class Dropdowns extends Component {
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

  nlp = () => {
    const { subject, course, targets } = this.state;
    axios.post('http://localhost:3030/api/nlp', { subject, course, targets }).then((response) => {
      console.log(response.data.resp);
      this.setState({
        nlpResponse: JSON.stringify(response.data.resp),
      });
    });
  }

  getCourseValues = () => {
    let courses;
    switch (this.state.course) {
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
        break;
      case 'GOVT':
        courses = [
          { label: '3', value: '3' },
          { label: '4', value: '4' },
          { label: '5', value: '5' },
          { label: '10', value: '10' },
          { label: '16', value: '16' },
          { label: '18', value: '18' },
        ];
        break;
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
        break;
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
        break;
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
        break;
      default:
        courses = [];
        break;
    }
    return courses;
  }

  dropdownPicker = () => {
    return (
      <>

        <DropDownPicker
          subjejcts={[
            { label: 'Economics', value: 'ECON' },
            { label: 'Government', value: 'GOVT' },
            { label: 'Engines', value: 'ENGS' },
            { label: 'Neuroscience', value: 'PSYC' },
            { label: 'Computer Science', value: 'COSC' },
          ]}
          defaultNull
          placeholder="Select Department"
          containerStyle={{ height: 40 }}
          onChangeItem={(subj) => this.setSubject(subj)}
        />
        <DropDownPicker
          items={this.getCourseValues()}
          defaultNull
          placeholder="Select Course Number"
          containerStyle={{ height: 40 }}
          onChangeItem={(c) => this.setCourse(c)}
        />
      </>
    );
  }

  getTargetOptions = () => {
    const options = [
      { label: 'Time', value: 'Time' },
      { label: 'Difficulty', value: 'Difficulty' },
      { label: 'Lecture Based', value: 'Lecture Based' },
      { label: 'Discussion Based', value: 'Discussion Based' },
      { label: 'Influence on Dartmouth Career', value: 'Influence on Dartmouth Career' },
    ];
    return (
      <ReactMultiSelectCheckboxes
        options={options}
        placeholderButtonLabel="Select Focus Area"
      />
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
        <View style={{ flexDirection: 'column' }}>
          {this.dropdownPicker()}
          <Text style={{
            fontSize: 16, fontWeight: '700', margin: '5%', textAlign: 'left',
          }}
          >
            I care about:
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {this.getTargetOptions()}
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

      </ScrollView>
    );
  }
}
export default Dropdowns;



import React, { Component } from 'react';
import {
  Text, TouchableHighlight, View, StyleSheet,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Table, TableWrapper, Row, Col,
} from 'react-native-table-component';
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

      </ScrollView>
    );
  }
}
export default BrowseScreen;
