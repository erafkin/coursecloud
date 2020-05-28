import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  subjectButton: {
    backgroundColor: '#00693e',
    alignItems: 'center',
    width: '50%',
    borderRadius: 5,
  },
  courseButton: {
    backgroundColor: '#00693e',
    padding: '2%',
    alignItems: 'center',
    borderRadius: 5,
    margin: '1%',
  },
  buttonWords: {
    color: '#FFFFFF',
    fontSize: 14,
    margin: '3%',
    width: 62,
  },
  buttonGo: {
    color: '#FFFFFF',
    fontSize: 14,
    margin: '3%',
    width: 20,
  },
  goButton: {
    backgroundColor: '#00693e',
    alignItems: 'center',
    width: '100%',
    borderRadius: 5,
  },
  watsonMessageContainer: {
    alignItems: 'flex-start',
    width: '100%',

  },
  clientMessageContainer: {
    alignItems: 'flex-end',
    width: '100%',


  },
  watsonMessage: {
    backgroundColor: '#00693e',
    maxWidth: '45%',
    borderRadius: 20,
    margin: '5%',
  },
  clientMessage: {
    backgroundColor: 'lightgray',
    maxWidth: '45%',
    borderRadius: 20,
    margin: '5%',

  },
  watsonMessageWords: {
    margin: 10,
    color: 'white',
  },
  clientMessageWords: {
    margin: 10,
    color: 'black',
  },
  chatbotInput: {
    position: 'absolute',
    bottom: 10,
    width: '90%',
    alignSelf: 'center',
  },
  newSession: {
    width: '50%',
    backgroundColor: '#00693e',
    padding: '2%',
    alignItems: 'center',
    borderRadius: 5,
    margin: '1%',
    alignSelf: 'center',
  },
  newSessionWords: {
    color: '#FFFFFF',
    fontSize: 14,
    margin: '3%',
    width: 200,
    textAlign: 'center',
  },
});
