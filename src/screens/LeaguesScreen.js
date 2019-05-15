import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PTRView from 'react-native-pull-to-refresh';
import { ExpoLinksView } from '@expo/samples';

import LeaguesBuilder from '../components/LeaguesBuilder/LeaguesBuilder';

import CustomHeader from '../navigation/CustomHeader';

export default class LeaguesScreen extends React.Component {
  constructor(props){
    super(props);
    this.refresh = this.refresh.bind(this);
  }

  static navigationOptions = {
    title: 'Top Leagues',
    headerStyle: { backgroundColor: '#2196f3', height: 50 },
    headerTintColor: '#fff',
  };

  refresh(){
    return new Promise((resolve) => {
      setTimeout(()=>{
        resolve()}, 2000)
    });
  }

  render() {
    return (
          <ScrollView style={styles.container}>
            <LeaguesBuilder {...this.props}/>
          </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#fff',
  },
});
