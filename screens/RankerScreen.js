import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
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
      target: '',

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

  changeTarget = (text) => {
    this.setState({
      response1: '',
      response2: '',
      target: text,
    });
  }

  rank = () => {
    const {
      course1, course2, subject1, subject2, target,
    } = this.state;
    const promises = [];
    promises.push(
      new Promise((resolve, reject) => {
        axios.post('http://localhost:3030/api/nlp', { subject: subject1, course: course1, targets: target === '' ? undefined : [target] }).then((resp) => {
          resolve(resp.data.resp);
        });
      }),
    );
    promises.push(
      new Promise((resolve, reject) => {
        axios.post('http://localhost:3030/api/nlp', { subject: subject2, course: course2, targets: target === '' ? undefined : [target] }).then((resp) => {
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
      subject1, subject2, course1, course2, response1, response2, target,
    } = this.state;
    let temp1 = [];
    let temp2 = [];
    if (response1 !== '') temp1 = JSON.parse(response1);
    const resp1 = temp1[0];
    if (response2 !== '') temp2 = JSON.parse(response2);
    const resp2 = temp2[0];
    const subjects = [{ value: 'COSC' }, { value: 'ENGS' }, { value: 'ECON' }, { value: 'GOV' }, { value: 'PSYC' }];
    const courses = {
      COSC: [{ value: '1' }, { value: '10' }, { value: '11' }, { value: '16' }, { value: '22' }, { value: '24' }],
      ECON: [{ value: '1' }, { value: '2' }, { value: '5' }, { value: '10' }, { value: '20' }, { value: '21' }, { value: '22' }, { value: '24' }, { value: '25' }],
      ENGS: [{ value: '2' }, { value: '3' }, { value: '8' }, { value: '11' }, { value: '12' }, { value: '20' }, { value: '21' }, { value: '22' }, { value: '24' }, { value: '25' }],
      GOV: [{ value: '3' }, { value: '4' }, { value: '5' }, { value: '10' }, { value: '16' }, { value: '18' }],
      PSYC: [{ value: '1' }, { value: '6' }, { value: '10' }, { value: '11' }, { value: '28' }, { value: '35' }, { value: '36' }, { value: '37' }, { value: '38' }],
    };

    let errorMessage = '';
    if ((response1 !== '' && resp1.code !== undefined) || (response2 !== '' && resp2.code !== undefined)) {
      if (resp1.code !== undefined && resp2.code !== undefined) {
        errorMessage = `${subject1}${course1} and ${subject2}${course2}`;
      } else if (resp1.code !== undefined) {
        errorMessage = `${subject1}${course1}`;
      } else if (resp2.code !== undefined) {
        errorMessage = `${subject2}${course2}`;
      }
    }
    return (
      <ScrollView>
        <View style={{ flexDirection: 'column', margin: '5%' }}>
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
          <Text style={{ textAlign: 'center' }}>VS</Text>
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
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(text) => this.changeTarget(text)}
            placeholder="eg. difficulty"
            value={target}
          />

          <View style={{ alignItems: 'center' }}>
            <TouchableHighlight style={styles.goButton} onPress={() => { this.rank(); }}><Text style={styles.buttonWords}>Go!</Text></TouchableHighlight>
          </View>
          <View>
            {(response1 !== '' && resp1.code !== undefined) || (response2 !== '' && resp2.code !== undefined)
              ? (
                <Text>
                  In
                  {' '}
                  {errorMessage}
                  {' '}
                  there is no mention of
                  {' "'}
                  {target}
                  {'" '}
                  , please input a different keyword, class, or use no keyword at all
                  {' '}
                </Text>
              )
              : (
                <View>
                  {response1 !== '' && response2 !== ''
                    ? (
                      <View>
                        { (resp1.sentiment.document.score > resp2.sentiment.document.score) ? (
                          <Text>
                            Overall, people liked
                            {' '}
                            {resp1.course}
                            {' '}
                            more than
                            {' '}
                            {resp2.course}
                          </Text>
                        ) : (
                          <Text>
                            Overall, people liked
                            {' '}
                            {resp2.course}
                            {' '}
                            more than
                            {' '}
                            {resp1.course}
                          </Text>
                        )}
                        {target === '' ? <View />
                          : (
                            <View>
                              <Text>
                                People in
                                {' '}
                                {resp1.course}
                                {' '}
                                felt
                                {' '}
                                {resp1.sentiment.targets[0].label}
                                {' '}
                                about the class&apos;
                                {' '}
                                {target}
                                {' '}
                                with a score of
                                {' '}
                                {resp1.sentiment.targets[0].score}
                                {' '}
                                and people in
                                {' '}
                                {resp2.course}
                                {' '}
                                felt
                                {' '}
                                {resp2.sentiment.targets[0].label}
                                {' '}
                                about the class&apos;
                                {' '}
                                {target}
                                {' '}
                                with a score of
                                {' '}
                                {resp2.sentiment.targets[0].score}
                              </Text>
                            </View>
                          )}
                      </View>
                    )
                    : <View />}
                </View>
              )}

          </View>

        </View>

      </ScrollView>
    );
  }
}
export default RankerScreen;
