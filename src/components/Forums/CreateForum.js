import React from 'react';

import { Input } from 'react-native-elements';
import { Button, Text, View, Dimensions, StyleSheet, Image, TextInput, TouchableOpacity, AsyncStorage } from "react-native";
import Actions from '../../actions/actions';

export default class CreateForum extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            user: '',
        };
        this.actions = new Actions();
        this.onChange = this.onChange.bind(this);
        this.createForum = this.createForum.bind(this);
    }

    static navigationOptions = () => ({
        title: 'Create Forum',
        headerStyle: { backgroundColor: '#2196f3', height: 50 },
        headerTintColor: '#fff',
      });

    async componentWillMount(){
        let user = await AsyncStorage.getItem('userId');
        console.log(user);
        this.setState({ user: user});
    }

    onChange(text, key){
        let state = Object.assign({}, this.state);
        state.title = text;
        this.setState(state);
    }

    createForum(){
        let data = {
            title: this.state.title,
            createdBy: this.state.user
        };
        console.log(data);
        this.actions.createForum(data, (res)=>{
            this.props.navigation.goBack();
            this.props.navigation.state.params.onRefresh({ created: true });
        });
    }

    render(){
        return(
            <View style={{ marginTop: 50, marginHorizontal: 20}}>
            
            <Input placeholder="Title" multiline = {true}
          numberOfLines = {2} onChangeText={(text)=>this.onChange(text, 'title')}/>
            <View style={styles.CreateForm}>
                <TouchableOpacity onPress={this.createForum}>
                    <Text style={styles.CreateForumButton}>Create Forum</Text>
                </TouchableOpacity>
            </View>


            <Button title="Back" onPress={()=>{
                this.props.navigation.goBack();
                this.props.navigation.state.params.onRefresh();
            } }/>
        </View>

        )
    }
 
}

const styles=StyleSheet.create({
    CreateForm: {
        marginTop: 25,
        marginBottom: 15,
        width: "50%",
        marginHorizontal: "25%",
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
        color: "#428AF8"
    },
    CreateForumButton: {
        color: "white",
        textAlign: "center"
    },
    CreateFormInput: {
        marginBottom: 10
    }
});