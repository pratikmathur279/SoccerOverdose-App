import React from 'react';

import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';

const ChatMessages = (props) =>{
    const buildItem = (item) => {
        return(
            <View >
                <Text style={[ item.user === props.currentUser ? styles.CurrentForumItem: styles.ForumItem]}>{item.user} - {item.message}</Text>
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
        backgroundColor: "#B3B3B3",
        color: '#3B83C4',
        // width: 'auto',
        // maxWidth: '60%'
    },
    CurrentForumItem: {
        height: 50,
        marginBottom: 20,
        paddingTop: 20,
        textAlign: 'right',
        color: '#fbfbfb',
        backgroundColor: '#3B83C4',
        // marginLeft: '40%',
        // maxWidth: '60%',
        // alignSelf: 'flex-start',
        paddingRight: 10,
    }

})
export default ChatMessages;