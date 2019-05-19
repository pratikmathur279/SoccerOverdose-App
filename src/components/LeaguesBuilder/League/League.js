import React, { Component } from 'react';

import Flag from 'react-native-flags';
import {Text, View, StyleSheet, Image, TouchableHighlight} from 'react-native';

const League = (props) => {
    return(
    <View>
        
        <TouchableHighlight style={styles.Touch}>
        <View style={styles.Component}>
            <Flag code={props.code} size={props.size} style={styles.Flag} />
            <Text style={styles.League} id={props.id} onPress={()=>props.onClick(props.id)}>{props.name}</Text>
            </View>    
        </TouchableHighlight>
    </View> 

    );
}

const styles = StyleSheet.create({
    Component: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#F7F7F7'
    },
    League: {
        marginTop: 5,
        fontSize: 18,
        paddingTop: 15,
        paddingLeft: 8,
        justifyContent: 'center'
    },
})

export default League;