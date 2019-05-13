
import React from "react";
import { Header } from "react-navigation";
import { View, Text, Platform, Image } from "react-native";
// import DeviceInfo from 'react-native-device-info';
import LinearGradient from "react-native-linear-gradient";
import UserModal from "../components/Modals/UserModal";

const CustomHeader = props => {
    // console.log(DeviceInfo);
  return (
    <View
      style={{
        height: 100,
        flexDirection: 'row',
        backgroundColor: '#2196f3',
        marginTop: Platform.OS == "ios" ? 0 : 0
      }}>
      <View style={{
        // position: 'absolute',
        // left: 10,
        paddingTop: 60,
        flexDirection: 'row',
        // bottom: 0
      }}>
        <Image style={{ height: 30, width: "80%", resizeMode: 'contain', marginLeft: -35, justifyContent: 'center'}} source={require('../assets/images/Logo/tmslogo.png')} />
        <UserModal title="Login" text="You need to login to continue"/>
        
      </View>
    </View>
  );
};

export default CustomHeader;
