import React, { Component } from 'react';

import {Text, View} from 'react-native';
import Leagues from './Leagues/Leagues';
import Standings from '../Standings/Standings.js';

class LeaguesBuilder extends Component {
    constructor() {
        super();
        this.state = {
            standings: [],
            competitionName: ''
        };
        // this.actions = new Actions();
        this.leagueClick = this.leagueClick.bind(this);
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
            state.standings = data.standings;
            state.competitionName = data.competition.name;
            this.setState(state);
            })
        }

      componentWillMount(){
          
      }

    render () {
        return (
            <View>
                <Leagues leagueClick={this.leagueClick} />
                <Standings competitionName={this.state.competitionName} standings={this.state.standings}/>
            </View>
        );
    }
}

export default LeaguesBuilder;