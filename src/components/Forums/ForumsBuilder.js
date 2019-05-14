import React from 'react';

import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const ForumBuilder = (props) =>{
    const buildItem = (item) => {
        return(
            <View style={styles.ForumItem}>
                <TouchableOpacity onPress={()=>{props.openForum(item.id, item.title)}} id={item.id}>
                    <Text style={styles.Title}>
                        {item.title}
                    </Text>
                    <Text style={styles.createdBy}>
                        {item.createdBy}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    
    if(props.forums.length >0){
        return(
            <View>
                {props.forums.map(buildItem)}
            </View>
        );
    }
    else {
        return null;
    }
}

const styles = StyleSheet.create({
    ForumItem: {
        height: 50,
        paddingVertical: 10,
        paddingLeft: 10,
        marginBottom: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(255,255,255,0.7)",
        // backgroundColor: "#3B83C4",
        // color: '#428AF8'
    },
    Title: {
        // color: '#428AF8'
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(255,255,255,0.7)",
        fontSize: 16  
    },
    createdBy: {
        color: '#B3B3B3',
        fontSize: 12
    }
})
export default ForumBuilder;