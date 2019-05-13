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
        loading: false,
        error: '',
        title: props.title,
        Login: {
          username: '',
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
  
  Login = () => {
    console.log(this.state.Login.username);
    let state = Object.assign({}, this.state);

    this.actions.checkUserAuth(this.state.Login.username, async (res)=>{
      if(res){
        console.log(res);
          let temp = await AsyncStorage.setItem('userId', (this.state.Login.username));
          console.log(temp);
          this.setState({ isModalVisible: !this.state.isModalVisible})  
      }
      else{
        console.log(res);
        state.error = "Check your credentials"; 
        this.setState(state);
      }
    });
    
  };

  Register = () => {
    console.log(this.state.Register);
    this.actions.createUser(this.state.Register, (data)=> {
      this.setState({ showLogin: true, error: 'Registration Successful!' });
    });
  }

  toggleForm = () => {
    this.setState({ showLogin: !this.state.showLogin})
  }

  onChange = (value, key) => {
    let state = Object.assign({}, this.state);
    if(key=='username'){
      state.Login.username = value;
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
        <Button title={this.state.title} onPress={this.toggleModal} />
        <Button title="Logout" onPress={this.logout} />
        <Modal 
            isVisible={this.state.isModalVisible} 
            deviceWidth={deviceWidth}
            deviceHeight={deviceHeight}
            onBackdropPress={() => this.setState({ isModalVisible: false })}
        >
          <View style={{ flex: 0.9, backgroundColor: "#C0C0C0" }}>
            <TouchableOpacity style={styles.CloseButton} onPress={this.toggleModal}>

              <Icon.Ionicons
                name="ios-close"
                size={32}
                style={{ marginBottom: -3 }}
                color="#000000"
              />
          </TouchableOpacity>
            <View style={styles.LogoContainer}>
              <Image style={styles.LogoImage} source={require('../../assets/images/Logo/logo-1.png')} />
            </View>
            {this.state.showLogin ? 
              <View style={styles.LoginForm}>
                <Text style={styles.ErrorMessage}>{this.state.text}</Text>
                <Text style={styles.ErrorMessage}>{this.state.error}</Text>
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
    alignItems: 'center'
  },
  CloseButton: {
    position: 'absolute',
    right: 10,
    top: 5
  }, 
  LogoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30
  },
  LogoImage: {
    width: 280,
    height: 280,
    resizeMode: 'contain'
  },
  LoginForm: {
    marginTop: 20,
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