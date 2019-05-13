import React from 'react';
import { ExpoConfigView } from '@expo/samples';

import {
  Image,
  Platform,
  ScrollView,
  Button,
  StyleSheet,
  Text,
  StatusBar,
  NavigatorIOS,
  TouchableOpacity,
  View,
} from 'react-native';

export default class ProfileScreen extends React.Component {

    constructor(props){
        super(props);
    }
    
    static navigationOptions = {
      title: 'Profile',
      headerStyle: { backgroundColor: '#2196f3', height: 50 },
      headerTintColor: '#fff',
    };

  render() {
    return (
      <View>
          <View>
            <StatusBar backgroundColor="blue" barStyle="light-content" hidden = {false}/>
        </View>
            <Text>User profile</Text>
      </View>
    );
  }
}
