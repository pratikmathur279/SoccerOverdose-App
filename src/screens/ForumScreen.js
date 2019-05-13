import React from 'react';
import { ExpoConfigView } from '@expo/samples';

import ForumsBuilder from '../components/Forums/ForumsBuilder';
import Modal from "react-native-modal";

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
        this.handleMessageChange = this.handleMessageChange.bind(this);
    }
    
    componentWillMount(){
        console.log("mounted");
        let state = Object.assign({}, this.state);
        this.actions.getForums((data)=>{
            state.forums = data;
            this.setState(state);
        })
    }

    componentWillUnmount(){
        console.log('unmounted');
        AsyncStorage.removeItem('userId');
    }

    componentWillUpdate(){
        console.log('mounted again');
    }

    async openForum(e){
        const loggedin = ( await AsyncStorage.getItem('userId') ? true : false);
            this.props.navigation.navigate('Chat', {
                item_id: e
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
            <View>
                <Text style={styles.Heading}>Click on the forum to open it</Text>
                <View>
                    <ForumsBuilder 
                        forums={this.state.forums} 
                        navigation={this.props.navigation} 
                        openForum={this.openForum}
                    />
                </View>
            </View>
        </View>
    );
  }
}

const styles=StyleSheet.create({
    Button: {
        backgroundColor: "red"
    },
    Heading: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 15
    }
});