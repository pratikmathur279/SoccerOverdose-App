import React from 'react';


import {Text, View, StyleSheet, RefreshControl} from 'react-native';
// import classes from './Standings.css';
import { Table, Row, Rows } from 'react-native-table-component';
import { ScrollView } from 'react-native-gesture-handler';

const Standings = (props)=> {
    console.log(props.count);

    if(props.standings.length > 0){

        const flexArr = [0.8, 3.7, 0.8, 0.8, 0.8, 0.8, 1, 1];

        const buildItem = (item) => {
            let data = [item.position, item.team.name, item.playedGames, item.won, item.draw, item.lost, item.goalDifference, item.points];
            return(
                <Row key={item.position} data={data} textStyle={styles.text} flexArr={flexArr} />
            )
        };

        // const widthArr = [25, 140, 30, 35, 30, 30, 40, 40]
        const tableHead=['', 'Team', 'PL', 'W', 'D', 'L', 'GD', 'Pts'];
        return(
            <ScrollView refreshControl={
                <RefreshControl
                  refreshing={props.refreshing}
                  onRefresh={props.onRefresh}
                />
              }vertical={true}>
                <View style={styles.Standings}>
                    <Text style={styles.header}>{props.competitionName}</Text>
                    <Row  data={tableHead} style={styles.head} textStyle={styles.text} flexArr={flexArr} />
                    {props.standings[0].table.map(buildItem)}
                </View>
            </ScrollView>

        )
    }
    else {
        return null;
    }
}

const styles = StyleSheet.create({
    Standings: { marginLeft: 5, flex: 1, textAlign: 'center' },
    header: {textAlign: 'center', fontSize: 20, marginTop: 15, marginBottom: 10},
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, flex: 1, backgroundColor: '#f1f8ff', alignContent: 'center' },
    text: { margin: 6, fontSize: 12,  flex: 1, alignContent: 'center' }
  });

export default Standings;