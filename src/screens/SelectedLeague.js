import React from 'react';
import KeyboardListener from 'react-native-keyboard-listener';

import { Text, View, StyleSheet, Platform, Dimensions, TextInput, KeyboardAvoidingView, Keyboard, AsyncStorage } from 'react-native';
import { Input } from 'react-native-elements';
import TabBarIcon from '../components/TabBarIcon';
import { Icon } from 'expo';
import Standings from '../components/Standings/Standings';
import Actions from '../actions/actions';

export default class SelectedLeague extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          standings: [],
          count: 0,
          competitionName: '',
          refreshing: false
        };
        this.actions = new Actions();
        this.onRefresh = this.onRefresh.bind(this);
    }

    componentWillMount(){
      console.log("came here "+this.state.count)
      let state = Object.assign({}, this.state);
      state.standings = this.props.navigation.getParam('standings');
      state.competitionName = this.props.navigation.getParam('competitionName');
      this.setState(state);
    }
    
    componentWillReceiveProps(){
      console.log("came here first"+this.state.count)
    }

    onRefresh(){
      console.log('refresh');
      this.setState({ refreshing: true});
      
      setTimeout(()=>{
        this.setState({ count: this.state.count+1, refreshing: false });
        // this.props.navigation.goBack();
        this.props.navigation.state.params.refresh();
        this.forceUpdate();
      }, 2000);
      
    }

    static navigationOptions = () => ({
        title: 'League',
        headerStyle: { backgroundColor: '#2196f3', height: 50 },
        headerTintColor: '#fff',
      });

  render() {
    return (
      <View>
        <Standings count={this.state.count} onRefresh={this.onRefresh} refreshing={this.state.refreshing} competitionName={this.state.competitionName} standings={this.state.standings}/>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  Message: {
    flexDirection: 'row',
    flex: 0.9
  },
  MessageBox: {
    height: 0.6,
    flex: 0.7,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItem: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
})