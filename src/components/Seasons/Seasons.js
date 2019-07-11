import React from 'react';


import {Text, View, StyleSheet, RefreshControl, Image} from 'react-native';
// import classes from './Standings.css';
import { Table, Row, Rows } from 'react-native-table-component';
import { ScrollView } from 'react-native-gesture-handler';

const Seasons = (props)=> {
    // console.log(props.seasons);
    if(!isEmpty(props.seasons)){

        const buildItem = (item) => {
            if(item.winner == null){
                return null;
            }
            else{
                var startDate = new Date(item.startDate).getFullYear().toString();
                var endDate = new Date(item.endDate).getFullYear().toString().substr(-2);
                
                // let image = 'Manchester United FC';
                let image = (item.winner.name);
                image = image.replace(' ','_');
                image = image.replace(' ','_');
               
                imageUrl = `../../assets/teams/${image}.png`;
                console.log(imageUrl);
                return(
                    <View style={styles.Season}>
                        <Text>{startDate}/{endDate}</Text>
                        <View style={styles.Team}>
                            {/* {item.winner.crestUrl ? 
                            <Image source={{uri: imageUrl}} style = {{ width: 40, height: 40, resizeMode: 'contain' }}/>
                            : <View />} */}
                            <View style={styles.Winner}>
                                <Text>{item.winner.name}</Text>
                            </View>
                        </View>

                    </View>
                )    
            }
        };

        return(
            <ScrollView>
                <View style={styles.Standings}>
                    {props.seasons.seasons.map(buildItem)}
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
    Season: {
        paddingVertical: 3,
        paddingHorizontal: 20
    },
    Team: {
        flexDirection: 'row',
        marginVertical: 10
    },
    Winner: {
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
  });

export default Seasons;