import React from 'react';

import { Input } from 'react-native-elements';
import { Button, Text, View, Dimensions, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";

export default RegisterForm = (props) => {
    return(
        <View>
            <View style={styles.RegisterInput}>
                <Input onChangeText={(text)=>props.onChange(text, 'name')} placeholder="Name" name="name" style={styles.RegisterInput} />
            </View>
            <View style={styles.RegisterInput}>
                <Input onChangeText={(text)=>props.onChange(text, 'email')} placeholder="Email" name="email" style={styles.RegisterInput} autoCapitalize='none' />
            </View>
            <View style={styles.RegisterInput}>
                <Input onChangeText={(text)=>props.onChange(text, 'username')} placeholder="Username" name="Username" style={styles.RegisterInput} autoCapitalize='none' />
            </View>
            <View style={styles.RegisterInput}>
                <Input secureTextEntry={true} placeholder="Password" name="password" onChangeText={(text)=>props.onChange(text, 'password')} style={styles.RegisterInput} autoCapitalize='none' />
            </View>
            <View style={styles.RegisterInput}>
                <Input onChangeText={(text)=>props.onChange(text, 'favorite_team')} placeholder="Favorite Team" name="favorite_team" style={styles.RegisterInput}/>
            </View>

            <View style={styles.LoginButton}>
                <TouchableOpacity onPress={props.onSubmit}>
                    <Text style={styles.text}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles=StyleSheet.create({
    LoginButton: {
        marginTop: 5,
        width: "95%",
        marginHorizontal: 5,
        textAlign: "center",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#428AF8",
        paddingVertical: 12,
        borderRadius: 4,
        borderColor: "rgba(255,255,255,0.7)",
        borderWidth: StyleSheet.hairlineWidth
    },
    text: {
        textAlign: 'center',
        color: "white"
    },
    RegisterInput: {
        marginBottom: 10
    }
});