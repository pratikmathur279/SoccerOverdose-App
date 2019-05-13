import React from 'react';
import KeyboardListener from 'react-native-keyboard-listener';

import { Text, View, StyleSheet, Platform, Dimensions, TextInput, KeyboardAvoidingView, Keyboard, AsyncStorage } from 'react-native';
import { Input } from 'react-native-elements';
import TabBarIcon from '../components/TabBarIcon';
import { Icon } from 'expo';
import Actions from '../actions/actions';
import ChatMessages from '../components/ChatMessages/ChatMessages';

export default class ChatScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          message: '',
          height: 1,
          chatID: '',
          chatMessages: []
        };
        this.keyboardOpen = this.keyboardOpen.bind(this);
        this.keyboardClosed = this.keyboardClosed.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.refresh = this.refresh.bind(this);
        this.actions = new Actions();
    }

    async componentWillMount(){
      try{
        const user = await AsyncStorage.getItem('userId');
        console.log('user is ' +user);
        let state = Object.assign({}, this.state);
        state.chatID = this.props.navigation.getParam('item_id');
        this.actions.getChatMessages(state.chatID, (res)=>{
          state.chatMessages = res;
          state.user = user;
          console.log('finished');
          this.setState(state);
        });
      }
      catch(err){
        console.log(err);
      }

    }
  
    sendMessage(){
      let messagePackage = {
        chatID: this.state.chatID,
        message: this.state.message,
        user: this.state.user
      };
      console.log('here');
      this.actions.sendMessage(messagePackage, (res)=>{
        this.refresh();
      })
    }

    refresh(){
      let state = Object.assign({}, this.state);
      this.actions.getChatMessages(state.chatID, (res)=>{
        state.chatMessages = res;
        state.message = '';
        this.setState(state);
      });
    }

    handleMessageChange(e){
      console.log(e);
      const value = e;
      
      let state = Object.assign({}, this.state);
      
          state.message = value;
      
      this.setState(state);
    }

    keyboardOpen(){
      let state = Object.assign({}, this.state);
      state.height = 0.7;
      this.setState(state);
    }

    keyboardClosed(){
      let state = Object.assign({}, this.state);
      state.height = 1;
      this.setState(state);
    }
  
    static navigationOptions = () => ({
        title: 'Chat',
        headerStyle: { backgroundColor: '#2196f3', height: 50 },
        headerTintColor: '#fff',
      });

  render() {
    return (
      <View style={{flex: this.state.height}}>
        <Text>Chat</Text>
        <ChatMessages messages={this.state.chatMessages} />

        <View style={styles.tabBarInfoContainer}>
        <KeyboardListener
            onWillShow={this.keyboardOpen}
            onWillHide={this.keyboardClosed}
        />
        <View style={styles.Message}>
          <Input placeholder="message" name="message" value={this.state.message} onChangeText={(text)=>this.handleMessageChange(text)}  multiline = {true}
          numberOfLines = {5} style={styles.MessageBox}/>
          
          <Icon.Ionicons
            name="md-send"
            size={30}
            style={{ marginBottom: -3, marginLeft: -3}}
            color="#2196f3"
            onPress={this.sendMessage}
          />

        </View>

      </View>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  Message: {
    flexDirection: 'row',
    flex: 0.9
  },
  MessageBox: {
    height: 0.6,
    flex: 0.7,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
})