import React from 'react';
import { ExpoConfigView } from '@expo/samples';

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';



export default class FixturesScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Fixtures',
    headerStyle: { backgroundColor: '#2196f3' },
      headerTintColor: '#fff',
  });

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    // return <ExpoConfigView />;
    return (
      <View style={styles.FixturesContainer}>
          <Text>Fixtures!</Text>
          <View>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')}>
              <Text>Click text!</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  FixturesContainer: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});