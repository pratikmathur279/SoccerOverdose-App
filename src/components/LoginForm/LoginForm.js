import React from 'react';

import { Input } from 'react-native-elements';
import { Button, Text, View, Dimensions, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";

export default LoginForm = (props) => {
    return(
        <View>
            <View style={styles.LoginInput}>
                <Input onChangeText={(text)=>props.onChange(text, 'username')} placeholder="Username" name="username" style={styles.LoginInput} autoCapitalize='none' />
            </View>
            <View>
                <Input secureTextEntry={true} placeholder="Password" name="password" onChangeText={(text)=>props.onChange(text, 'password')} style={styles.LoginInput} autoCapitalize='none' />
            </View>
            
            <View style={styles.LoginButton}>
                <TouchableOpacity onPress={props.onSubmit}>
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
                {/* <Button title="Login" /> */}
            </View>

        </View>
    );
}

const styles=StyleSheet.create({
    LoginButton: {
        marginTop: 30,
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
    LoginInput: {
        marginBottom: 25
    }
});