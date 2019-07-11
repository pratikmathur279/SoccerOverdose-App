import React from 'react';
import KeyboardListener from 'react-native-keyboard-listener';

import { Text, View, StyleSheet, Platform, Dimensions, TextInput, KeyboardAvoidingView, Keyboard, AsyncStorage } from 'react-native';
import { Input } from 'react-native-elements';
import TabBarIcon from '../TabBarIcon';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Icon } from 'expo';
import Standings from '../Standings/Standings';
import Seasons from '../Seasons/Seasons';
import Actions from '../../actions/actions';

export default class SelectedLeague extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          standings: [],
          count: 0,
          competitionName: '',
          refreshing: false,
          index: 0,
          routes: [
            { key: 'first', title: 'Standings' },
            { key: 'second', title: 'Seasons' },
            { key: 'third', title: 'Stats' },
          ],
        };
        this.actions = new Actions();
        this.onRefresh = this.onRefresh.bind(this);
    }

    componentWillMount(){
      let state = Object.assign({}, this.state);
      state.standings = this.props.navigation.getParam('standings');
      state.competitionName = this.props.navigation.getParam('competitionName');
      state.seasons = this.props.navigation.getParam('seasons');
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
    const FirstRoute = () => (
      <View>
        <Standings count={this.state.count} onRefresh={this.onRefresh} refreshing={this.state.refreshing} competitionName={this.state.competitionName} standings={this.state.standings}/>
      </View>
    );
    const SecondRoute = () => (
      <View style={[styles.scene]} >
      <Seasons seasons={this.state.seasons} />
      </View>
    );
    return (

      <TabView
        navigationState={this.state}
        lazy={true}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
          third: SecondRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
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
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
})