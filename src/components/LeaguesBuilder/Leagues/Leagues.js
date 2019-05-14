import React, { Component } from 'react';
import {Text, View, StyleSheet} from 'react-native';

import League from '../League/League';

const Leagues = (props) => {
    return(
        <View  style={styles.Leagues}>
            <League id="PD" name="La Liga" code="ES" onClick={props.leagueClick}/>
            <League id="PL" name="Premier League" code="GB" onClick={props.leagueClick}/>
            <League id="FL1" name="Ligue 1" code="FR" onClick={props.leagueClick} />
            <League id="BL1" name="Bundesliga" code="DE" onClick={props.leagueClick} />
            <League id="SA" name="Serie A" code="IT" onClick={props.leagueClick} />
            {/* <League id="CL" name="Champions League" code="" onClick={props.leagueClick} /> */}
            <League id="DED" name="Eredivise" code="NL" onClick={props.leagueClick} />
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