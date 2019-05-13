
import React from "react";
import { Header } from "react-navigation";
import { View, Text, Platform, Image } from "react-native";
// import DeviceInfo from 'react-native-device-info';
import LinearGradient from "react-native-linear-gradient";

const CustomHeader = props => {
    // console.log(DeviceInfo);
  return (
    <View
      style={{
        height: 100,
        backgroundColor: '#2196f3',
        marginTop: Platform.OS == "ios" ? 0 : 0
      }}
    >
    </View>
  );
};

export default CustomHeader;
