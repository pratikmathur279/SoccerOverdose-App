import React, { Component } from "react";
import { Button, Text, View, Platform, Dimensions, StyleSheet, Image, TextInput, TouchableOpacity, AsyncStorage } from "react-native";
import Modal from "react-native-modal";
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

import { Icon } from 'expo';
import Actions from '../../actions/actions';

export default class UserModal extends Component {
    constructor(props){
      super(props);
      this.state = {
        isModalVisible: false,
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
        showLogin: true,
        isLoggedIn: false
      };
      this.actions = new Actions();
    }

  componentWillReceiveProps(props){
    console.log(props);
  }
  
  async componentWillMount(){
    let temp = await AsyncStorage.getItem('userId') ? true : false;
    console.log("came here for " + temp);
    let state = Object.assign({}, this.state);
    state.isLoggedIn = temp;
    this.setState(state);
  }

  // async componentWillUpdate(){
  //   let temp = await AsyncStorage.getItem('userId') ? true : false;
  //   console.log("came here for " + temp);
  //   let state = Object.assign({}, this.state);
  //   state.isLoggedIn = temp;
  //   this.setState(state);
  // }

  Login = () => {
    console.log(this.state.Login.username);
    let state = Object.assign({}, this.state);

    this.actions.checkUserAuth(this.state.Login.username, async (res)=>{
      if(res.isActive){
        console.log(res);
          let temp = await AsyncStorage.setItem('userId', (this.state.Login.username));
          console.log(temp);
          this.setState({ isModalVisible: !this.state.isModalVisible});
          this.componentWillMount();  
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
    this.setState({ isLoggedIn: false });
    // alert("You have successfully logged out!");
  }

  toggleModal = () => {
    console.log("here");
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

    return (
      <View>
        <TouchableOpacity onPress={this.toggleModal} style={styles.ProfileButton}>
          <Icon.Ionicons
                name="ios-contact"
                size={36}
                color="#000000"
              />
        </TouchableOpacity>
        
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
          {this.state.isLoggedIn ? 
            <View>
              <Text>LoggedIn</Text>
              <Text>LoggedIn</Text>
              <Text>LoggedIn</Text>
              <Text>LoggedIn</Text>
              <Text>LoggedIn</Text>
              <Text>LoggedIn</Text>
              <Text>LoggedIn</Text>
              <Text>LoggedIn</Text>
              <Text>LoggedIn</Text>
              <Text>LoggedIn</Text>
              <Text>LoggedIn</Text>
              <Text>LoggedIn</Text>
              <Text>LoggedIn</Text>

              <Button style={[styles.LogoutButton]} title="Logout" onPress={this.logout} />
              </View>
          :
            <View>
              <View style={styles.LogoContainer}>
              <Image style={styles.LogoImage} source={require('../../assets/images/Logo/soccerod-new.jpeg')} />
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
  ProfileButton: {
    position: 'relative',
    marginLeft: 75
  },
  FlexContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  LogoutButton: {
    marginTop: 300
  },
  CloseButton: {
    position: 'absolute',
    right: 10,
    zIndex: 2000,
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