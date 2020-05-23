import React, { Component } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

class BrowseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: 'not connected to the local API',
    };
  }

   getData = () => {
     axios.get('http://localhost:3030/api')
       .then((res) => {
         console.log(res.data);
         this.setState({
           connected: JSON.stringify(res.data),
         });
       });
   }

   clear = () => {
     this.setState({
       connected: 'not connected to the local API',
     });
   }

   render() {
     const { connected } = this.state;
     return (
       <ScrollView>
         <Text>Browse page</Text>
         <TouchableHighlight onPress={() => { this.getData(); }}>
           <Text>Click to connect to API</Text>
         </TouchableHighlight>
         <Text>{connected}</Text>
         <TouchableHighlight onPress={() => { this.clear(); }}>
           <Text>Click to clear</Text>
         </TouchableHighlight>
       </ScrollView>
     );
   }
}
export default BrowseScreen;
