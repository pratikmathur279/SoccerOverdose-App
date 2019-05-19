import React from 'react';


import {Text, View, StyleSheet, RefreshControl} from 'react-native';
// import classes from './Standings.css';
import { Table, Row, Rows } from 'react-native-table-component';
import { ScrollView } from 'react-native-gesture-handler';

import Flag from 'react-native-flags';
import League from '../LeaguesBuilder/League/League';

const Fixtures = (props)=> {
    console.log(props.fixturess);
    if(!isEmpty(props.fixtures)){

        // const flexArr = [0.8, 3.7, 0.8, 0.8, 0.8, 0.8, 1, 1];

        const buildItem = (item) => {
            console.log(item.homeTeam.name);
            
            return(
                <View key={item.id} style={styles.Match}>
                    <Text style={styles.AlignTeam1}>{item.homeTeam.name}</Text>
                    {(item.score.fullTime.homeTeam !== null)
                    ? <Text style={styles.AlignScore}>{item.score.fullTime.homeTeam} - {item.score.fullTime.awayTeam}</Text> 
                    : 
                    <Text style={styles.AlignTeam2}>-</Text>
                    } 
                    
                    <Text style={styles.AlignTeam3}>{item.awayTeam.name}</Text>
                </View>
            )
        };

        return(
            <ScrollView>
                <View style={styles.Standings}>
                    <View style={styles.Component}>
                        <Flag id={props.fixtures.competition.code} name={props.fixtures.competition.name} code="ES" size={32} />
                        <Text style={styles.League} id={props.id} onPress={()=>props.onClick(props.id)}>{props.fixtures.competition.area.name} - {props.fixtures.competition.name}</Text>
                    </View>

            
                    {props.fixtures.matches.map(buildItem)}
                </View>
            </ScrollView>

        )
    }
    else {
        return null;
    }
}


function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const styles = StyleSheet.create({
    Standings: { marginLeft: 5, flex: 1, textAlign: 'center' },
    header: {textAlign: 'center', fontSize: 20, marginTop: 15, marginBottom: 10},
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, flex: 1, backgroundColor: '#f1f8ff', alignContent: 'center' },
    text: { margin: 6, fontSize: 12,  flex: 1, alignContent: 'center' },
    Flag: {},
    Component: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#F7F7F7',
        marginVertical: 10
    },
    League: {
        marginTop: 5,
        fontSize: 14,
        paddingTop: 4,
        paddingLeft: 8,
        justifyContent: 'center'
    },
    Match: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 5,
        alignItems: 'stretch',
        paddingVertical: 8
        // backgroundColor: '#673ab7',
    },
    AlignScore: {
        alignItems: 'stretch',
    },
    AlignTeam1: {
        width: "45%",
    },
    AlignTeam2: {
        width: "4%", 
        textAlign: 'center'
    },
    AlignTeam3: {
        width: "45%",
        textAlign: "right",
        paddingLeft: 3,
        paddingRight: 3

    }
  });

export default Fixtures;