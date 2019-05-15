import React from 'react';

import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';

import AutoScroll from 'react-native-auto-scroll';

const ChatMessages = (props) =>{
    
    const buildItem = (item) => {
        return(
            <View style={[ item.user === props.currentUser ? styles.CurrentForumItem: styles.ForumItem]}>
                <Text>{item.user} - {item.message}</Text>
            </View>
        )
    }
    
    if(props.messages.length >0){
        console.log("it got data");
        return(
            <ScrollView showsVerticalScrollIndicator={true} alwaysBounceVertical={true} keyboardDismissMode={"on-drag"} style={styles.ChatMessages}>
                {props.messages.map(buildItem)}
            </ScrollView>

            // <AutoScroll style={styles.ChatMessages}>
            //     {props.messages.map(buildItem)}
            // </AutoScroll>
        );
    }
    else {
        return null;
    }
}

const styles = StyleSheet.create({
    ChatMessages: {
        marginBottom: 80
    },
    MessageContainer: {
        maxWidth: '60%',
        marginLeft: '40%'
    },
    ForumItem: {
        marginBottom: 10,
        paddingVertical: 10,
        backgroundColor: "#B3B3B3",
        color: '#3B83C4',
        paddingLeft: 10,
        borderRadius: 10,
        flexDirection:'row',
        paddingRight: 10,
        maxWidth: '60%',
        marginRight: '40%',
        alignSelf: 'flex-start'
    },
    CurrentForumItem: {
        paddingVertical: 10,
        marginLeft: "40%",
        marginBottom: 10,
        color: '#fbfbfb',
        backgroundColor: '#3B83C4',
        maxWidth: '60%',
        marginRight: 10,
        alignSelf: 'flex-end',
        paddingLeft: 10,
        borderRadius: 10,
        flexDirection:'row',
        paddingRight: 10,
    }

})
export default ChatMessages;