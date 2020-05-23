import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

import BrowseScreen from '../screens/BrowseScreen';
import ChatbotScreen from '../screens/ChatbotScreen';
import RankerScreen from '../screens/RankerScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Browse';

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  switch (routeName) {
    case 'Browse':
      return 'Browse Courses';
    case 'Chatbot':
      return 'Chatbot';
    case 'Ranker':
      return 'Ranker';
    default:
      return '';
  }
}

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Browse"
        component={BrowseScreen}
        options={{
          title: 'Browse',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="ios-search"
              size={30}
              style={{ marginBottom: -3 }}
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Chatbot"
        component={ChatbotScreen}
        options={{
          title: 'Chatbot',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="ios-chatbubbles"
              size={30}
              style={{ marginBottom: -3 }}
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Ranker"
        component={RankerScreen}
        options={{
          title: 'Ranker',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="ios-list"
              size={30}
              style={{ marginBottom: -3 }}
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
