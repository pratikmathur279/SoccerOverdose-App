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

import Fixtures from '../components/Fixtures/Fixtures';
import Actions from '../actions/actions';

export default class FixturesScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Fixtures',
    headerStyle: { backgroundColor: '#2196f3' },
      headerTintColor: '#fff',
  });

  constructor(props){
    super(props);
    this.state = {
      fixtures: {},
      Leagues: [{
        'id': 2021,
        'code': 'PL',
        'country': 'England',
        'name': 'Premier League'
      },
      {
        'id': 2014,
        'code': 'PD',
        'country': 'Spain',
        'name': 'Primera Division'
      },
      {
        'id': 2002,
        'code': 'BL1',
        'country': 'Germany',
        'name': 'Bundesliga'
      },
      {
        'id': 2015,
        'code': 'FL1',
        'country': 'Italy',
        'name': 'Ligue 1'
      },
    ]
  };
    this.actions = new Actions();
  }

  componentWillMount(){
    this.actions.getFixturesByCompetition(2014, (data)=>{
      let state = Object.assign({}, this.state);
      // state.fixtures = Object.assign({}, data);
      state.fixtures = data;
      // console.log(data);
      this.setState(state);
    });
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    // return <ExpoConfigView />;
    return (
      <View style={styles.FixturesContainer}>
          <Text>Fixtures!</Text>
          <View>
            <Fixtures fixtures={this.state.fixtures} />
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