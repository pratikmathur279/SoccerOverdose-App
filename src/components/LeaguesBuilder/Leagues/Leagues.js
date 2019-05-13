import React, { Component } from 'react';
import {Text, View, StyleSheet} from 'react-native';

import League from '../League/League';

const Leagues = (props) => {
    return(
        <View  style={styles.Leagues}>
            {/* <View>
                <Text style={styles.Heading}>Top Leagues</Text>
            </View> */}
            <League id="PD" name="La Liga" code="ES" onClick={props.leagueClick}/>
            <League id="PL" name="Premier League" code="GB" onClick={props.leagueClick}/>
            <League id="FL1" name="Ligue 1" code="FR" onClick={props.leagueClick} />
        </View> 
    )
      
}

const styles = StyleSheet.create({
    Leagues: {
      flex: 1,
      paddingTop: 5,
      backgroundColor: '#fff',
      paddingLeft: 10,
        paddingRight: 10,
    },
    Heading: {
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 5,
        fontSize: 20,
        marginBottom: 5,
        
    }

  });


export default Leagues;