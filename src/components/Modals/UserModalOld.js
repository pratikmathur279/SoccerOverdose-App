import React, { Component } from "react";
import { Button, Text, View, Dimensions, StyleSheet, Image, TextInput, TouchableOpacity, AsyncStorage } from "react-native";
import Modal from "react-native-modal";
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

import { Icon } from 'expo';
import Actions from '../../actions/actions';

export default class UserModal extends Component {
    constructor(props){
      super(props);
      this.state = {
        isModalVisible: true,
        text: props.text,
        title: props.title,
        Login: {
          email: '',
          password: ''
        },
        Register: {
          name: '',
          email: '',
          username: '',
          password: '',
          favorite_team: ''
        },
        showLogin: true
      };
      this.actions = new Actions();
    }

  componentWillReceiveProps(props){
    console.log(props);
  }
    
  Login = async () => {
    console.log(this.state.Login.email);
    try{
      await AsyncStorage.setItem('userId', (this.state.Login.email));
      this.setState({ isModalVisible: !this.state.isModalVisible})  
    }
    catch(err){
      console.log(err);
    }
  };

  Register = () => {
    console.log(this.state.Register);
    this.actions.createUser(this.state.Register, (data)=> {
      console.log('back');
      this.setState({ showLogin: true });
    });
  }

  toggleForm = () => {
    this.setState({ showLogin: !this.state.showLogin})
  }

  onChange = (value, key) => {
    let state = Object.assign({}, this.state);
    if(key=='email'){
      state.Login.email = value;
    }
    else {
      state.Login.password = value;
    }
    this.setState(state);
  }

  onRegisterChange = (value, key) => {
    let state = Object.assign({}, this.state);
    if(key=='name'){
      state.Register.name = value;
    }
    if(key=='email'){
      state.Register.email = value;
    }
    if(key=='username'){
      state.Register.username = value;
    }
    if(key=='password'){
      state.Register.password = value;
    }
    if(key=='favorite_team'){
      state.Register.favorite_team = value;
    }
    this.setState(state);
  }
  
  logout = async () => {
    await AsyncStorage.removeItem('userId');
    alert("You have successfully logged out!");
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

    return (
      <View>
        {/* <Button title={this.state.title} onPress={this.toggleModal} />
        <Button title="Logout" onPress={this.logout} /> */}
        <Modal 
            isVisible={this.state.isModalVisible} 
            deviceWidth={deviceWidth}
            deviceHeight={deviceHeight}
            onBackdropPress={() => this.setState({ isModalVisible: false })}
        >
          <View style={{ flex: 0.8, backgroundColor: "#C0C0C0" }}>
            <TouchableOpacity style={styles.CloseButton} onPress={this.toggleModal}>

              <Icon.Ionicons
                name="ios-close"
                size={32}
                style={{ marginBottom: -3 }}
                color="#000000"
              />
          </TouchableOpacity>

            {/* <Text style={styles.LoginHeader}>Login</Text> */}
            <View style={styles.LogoContainer}>
              <Image style={styles.LogoImage} source={require('../../assets/images/Logo/logo-1.png')} />
            </View>
            <Text style={styles.ErrorMessage}>{this.state.text}</Text>
            {this.state.showLogin ? 
              <View style={styles.LoginForm}>
                <LoginForm login={this.state.Login} onChange={this.onChange} onSubmit={this.Login} />
                <View style={styles.FlexContainer}>
                  <Text>
                    New User? 
                  </Text>
                </View>
                <Button title="Click here" onPress={this.toggleForm} />
                
              </View>
              :
              <View style={styles.RegisterForm}>
                <RegisterForm register={this.state.register} onChange={this.onRegisterChange} onSubmit={this.Register}/>
                <View style={styles.FlexContainer}>
                  <Text>
                    Already Registered? 
                  </Text>
                </View>
                <Button title="Click here" onPress={this.toggleForm} />
              </View>
            }

          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  LoginHeader: {
    fontSize: 22,
    textAlign: 'center'
  },
  FlexContainer: {
    marginTop: 20,
    alignItem: 'center'
  },
  CloseButton: {
    position: 'absolute',
    right: 10,
    top: 5
  }, 
  LogoContainer: {
    justifyContent: 'center',
    alignItem: 'center',
    marginHorizontal: 30
  },
  LogoImage: {
    width: 280,
    height: 280,
    resizeMode: 'contain'
  },
  LoginForm: {
    marginTop: 40,
    marginHorizontal: 35,
    textAlign: 'center',
  },
  RegisterForm: {
    marginHorizontal: 35,
    textAlign: 'center',
  },
  ErrorMessage: {
    color: "red",
    textAlign: "center"
  }
});