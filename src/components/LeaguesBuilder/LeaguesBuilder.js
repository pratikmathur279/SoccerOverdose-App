import React, { Component } from 'react';

import {Text, View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Leagues from './Leagues/Leagues';

class LeaguesBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            standings: [],
            competitionName: ''
        };
        // this.actions = new Actions();
        this.leagueClick = this.leagueClick.bind(this);
        this.refresh = this.refresh.bind(this);
      }

      leagueClick(e){
        let league = e;

        fetch(`https://api.football-data.org/v2/competitions/${league}/standings`, {
            method: 'GET',
            headers: {
                'X-Auth-Token' : '408bb5e0c24c41c4a641373c5099c42f'
            }
        })
        .then((response)=> response.json())
        .then((responseJson) => {
            var data = responseJson;
            let state = Object.assign({}, this.state);
            state.e = e;
            state.standings = data.standings;
            state.competitionName = data.competition.name;

            this.props.navigation.navigate('League', {
                standings: data.standings,
                competitionName: data.competition.name,
                refresh: this.refresh
            })
            this.setState(state);
            })
        }

      refresh(){
          this.leagueClick(this.state.e);
      }

    render () {
        return (
            <View>
                <Leagues onRefresh={this.refresh}leagueClick={this.leagueClick} />
            </View>
        );
    }
}

export default LeaguesBuilder;

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