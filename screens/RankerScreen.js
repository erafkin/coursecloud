import React, { Component } from 'react';
import { Text } from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-material-dropdown';
import axios from 'axios';
import styles from '../styles/style';

class RankerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject1: '',
      course1: '',
      subject2: '',
      course2: '',
      response1: '',
      response2: '',

    };
  }

  changeSubject = (val, num) => {
    if (num === 1) {
      this.setState({
        subject1: val,
      });
    } else if (num === 2) {
      this.setState({
        subject2: val,
      });
    }
  }

  changeCourse = (val, num) => {
    if (num === 1) {
      this.setState({
        course1: val,
      });
    } else if (num === 2) {
      this.setState({
        course2: val,
      });
    }
  }

  rank = () => {
    const {
      course1, course2, subject1, subject2,
    } = this.state;
    console.log(course1);
    const promises = [];

    promises.push(
      new Promise((resolve, reject) => {
        axios.post('http://localhost:3030/api/nlp', { subject: subject1, course: course1, targets: undefined }).then((resp) => {
          resolve(resp.data.resp);
        });
      }),
    );
    promises.push(
      new Promise((resolve, reject) => {
        axios.post('http://localhost:3030/api/nlp', { subject: subject2, course: course2, targets: undefined }).then((resp) => {
          resolve(resp.data.resp);
        });
      }),
    );
    Promise.all(promises).then((result) => {
      this.setState({
        response1: JSON.stringify(result[0]),
        response2: JSON.stringify(result[1]),
      });
    });
  }


  render() {
    const {
      subject1, subject2, response1, response2,
    } = this.state;
    const subjects = [{ value: 'COSC' }, { value: 'ENGS' }, { value: 'ECON' }, { value: 'GOV' }, { value: 'PSYC' }];
    const courses = {
      COSC: [{ value: '1' }, { value: '10' }, { value: '11' }, { value: '16' }, { value: '22' }, { value: '24' }],
      ECON: [{ value: '1' }, { value: '2' }, { value: '5' }, { value: '10' }, { value: '20' }, { value: '21' }, { value: '22' }, { value: '24' }, { value: '25' }],
      ENGS: [{ value: '2' }, { value: '3' }, { value: '8' }, { value: '11' }, { value: '12' }, { value: '20' }, { value: '21' }, { value: '22' }, { value: '24' }, { value: '25' }],
      GOV: [{ value: '3' }, { value: '4' }, { value: '5' }, { value: '10' }, { value: '16' }, { value: '18' }],
      PSYC: [{ value: '1' }, { value: '6' }, { value: '10' }, { value: '11' }, { value: '28' }, { value: '35' }, { value: '36' }, { value: '37' }, { value: '38' }],
    };

    return (
      <ScrollView>
        <Dropdown
          label="Subject"
          data={subjects}
          onChangeText={(val) => this.changeSubject(val, 1)}
        />
        <Dropdown
          label="Course"
          data={subject1 === '' ? [] : courses[subject1]}
          onChangeText={(val) => this.changeCourse(val, 1)}
        />
        <Text>VS</Text>
        <Dropdown
          label="Subject"
          data={subjects}
          onChangeText={(val) => this.changeSubject(val, 2)}
        />
        <Dropdown
          label="Course"
          data={subject2 === '' ? [] : courses[subject2]}
          onChangeText={(val) => this.changeCourse(val, 2)}
        />
        <TouchableHighlight style={styles.subjectButton} onPress={() => { this.rank(); }}><Text style={styles.buttonWords}>Go!</Text></TouchableHighlight>
        <Text>
          {' '}
          {response1}
          {' '}
        </Text>
        <Text>
          {' '}
          {response2}
          {' '}
        </Text>

      </ScrollView>
    );
  }
}
export default RankerScreen;
