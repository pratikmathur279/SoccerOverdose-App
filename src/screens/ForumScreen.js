import React from 'react';
import { ExpoConfigView } from '@expo/samples';

import ForumsBuilder from '../components/Forums/ForumsBuilder';
import Modal from "react-native-modal";

import CreateForum from '../components/Forums/CreateForum';

import {
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  Dimensions,
  AsyncStorage,
  Button
} from 'react-native';
import Actions from '../actions/actions';
import UserModal from '../components/Modals/UserModal';

export default class ForumScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            openModal: false,
            isModalVisible: false,
            forums: []
        };
        this.actions = new Actions();
        this.openForum = this.openForum.bind(this);
        this.getForums = this.getForums.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.refresh = this.refresh.bind(this);
    }
    
    async componentWillMount(){
        console.log("mounted");
        let state = Object.assign({}, this.state);
        let temp = (await AsyncStorage.getItem('userId') ? true : false ) ;
            this.actions.getForums((data)=>{
                state.forums = data;
                this.setState(state);
            })
    }

    getForums(){
        let state = Object.assign({}, this.state);
        this.actions.getForums((data)=>{
            state.forums = data;
            this.setState(state);
        })
    }

    componentWillUnmount(){
        AsyncStorage.removeItem('userId');
    }

    refresh(data){
        this.getForums();
    }

    async openForum(id, title){
        const loggedin = ( await AsyncStorage.getItem('userId') ? true : false);
            this.props.navigation.navigate('Chat', {
                item_id: id,
                item_title: title
            });
    }

    handleMessageChange(e){
        const key = e.target.name;
        const value = e.target.value;
        
        let state = Object.assign({}, this.state);
        if(key === 'message'){
            state.note[key] = value;
        }
        this.setState(state);
    }

    static navigationOptions = {
      title: 'Forum',
      headerStyle: { backgroundColor: '#2196f3', height: 50 },
      headerTintColor: '#fff',
    };

  render() {
    //   const param1 = this.props.navigation.getParam('item_id');

        const deviceWidth = Dimensions.get("window").width;
        const deviceHeight = Platform.OS === "ios" ? Dimensions.get("window").height : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

    return (
        <View>
            {/* {console.log(this.state.loggedIn)}
            {!this.state.loggedIn 
            ? 
                <Text>You're not logged in. Please login to continue</Text>    
                :  */}
            <View>
                <View style={styles.CreateForumButton}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("CreateForum", { onRefresh: this.refresh })}>
                        <Text style={styles.text}>Create Forum</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.Heading}>Click on the forum to open it</Text>
                <View>
                    <ForumsBuilder 
                        forums={this.state.forums} 
                        navigation={this.props.navigation} 
                        openForum={this.openForum}
                    />
                </View>
            </View>
            {/* } */}
        </View>
    );
  }
}

const styles=StyleSheet.create({
    Button: {
        backgroundColor: "red"
    },
    CreateForumButton: {
        marginTop: 10,
        width: "30%",
        marginLeft: "67%",
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
    Heading: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 15
    }
});