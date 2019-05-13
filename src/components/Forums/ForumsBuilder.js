import React from 'react';

import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const ForumBuilder = (props) =>{
    const buildItem = (item) => {
        return(
            <View style={styles.ForumItem}>
                <TouchableOpacity onPress={()=>{props.openForum(item.id)}} id={item.id}>
                    <Text>
                        {item.title}
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
        marginBottom: 20,
        backgroundColor: "#3B83C4",
        color: '#fff'
    }
})
export default ForumBuilder;