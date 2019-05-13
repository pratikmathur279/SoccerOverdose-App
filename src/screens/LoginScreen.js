import React from 'react';
import { ExpoConfigView } from '@expo/samples';

import { Text, View } from 'react-native';

export default class LoginScreen extends React.Component {

    constructor(props){
        super(props);
    }
    static navigationOptions = () => ({
        headerStyle: { backgroundColor: '#2196f3' },
          headerTintColor: '#fff'
      });

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    // return <ExpoConfigView />;
    const param1 = this.props.navigation.getParam('item_id');
    return (
      <View>
        <Text>Login</Text>
        <Text>Param: {JSON.stringify(param1)}</Text>
      </View>
    );
  }
}
