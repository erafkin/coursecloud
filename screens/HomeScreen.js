import * as React from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


export default function HomeScreen() {
  return (
    <ScrollView>
      <Text>Browse page</Text>
    </ScrollView>

  );
}

HomeScreen.navigationOptions = {
  header: null,
};
