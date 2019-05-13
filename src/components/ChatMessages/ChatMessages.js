import React from 'react';

import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';

const ChatMessages = (props) =>{
    const buildItem = (item) => {
        return(
            <View style={styles.ForumItem}>
                <Text>{item.user} - {item.message}</Text>
            </View>
        )
    }
    
    if(props.messages.length >0){
        console.log("it got data");
        return(
            <ScrollView style={styles.ChatMessages}>
                {props.messages.map(buildItem)}
            </ScrollView>
        );
    }
    else {
        return null;
    }
}

const styles = StyleSheet.create({
    ChatMessages: {
        marginBottom: 20
    },
    ForumItem: {
        height: 50,
        marginBottom: 20,
        paddingTop: 20,
        backgroundColor: "#3B83C4",
        color: '#fff'
    }
})
export default ChatMessages;