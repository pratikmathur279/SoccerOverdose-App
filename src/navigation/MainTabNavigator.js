import React from 'react';
import { Platform, Icon, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, HeaderBackButton} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LeaguesScreen from '../screens/LeaguesScreen';
import FixturesScreen from '../screens/FixturesScreen';
import ResultsScreen from '../screens/ResultsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ForumScreen from '../screens/ForumScreen';
import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';
import SelectedLeague from '../screens/SelectedLeague';

import CreateForum from '../components/Forums/CreateForum';

//HOME
const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
  }
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : ''}`
          : 'md-home'
      }
    />
  ),
};


//FIXTURES STACK
const FixturesStack = createStackNavigator({
  Fixtures: { screen: FixturesScreen },
  Login: {
    screen: LoginScreen,
    title: 'Login',
    headerStyle: { backgroundColor: '#2196f3' },
    headerTintColor: '#fff',
      headerLeft: <HeaderBackButton onPress={() => this.props.navigation.goBack(null)} />
  }
}, {
  initialRouteName: 'Fixtures'
});

FixturesStack.navigationOptions = {
  tabBarLabel: 'Fixtures',
  title: 'Fixtures',
  headerStyle: { backgroundColor: '#2196f3' },
	headerTintColor: '#fff',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};


//LEAGUES
const LeaguesStack = createStackNavigator({
  Leagues: LeaguesScreen,
  League: SelectedLeague
});

LeaguesStack.navigationOptions = {
  tabBarLabel: 'Leagues',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-trophy' : 'md-trophy'}
    />
  ),
};

//RESULTS
const ResultsStack = createStackNavigator({
  Results: ResultsScreen,
});

ResultsStack.navigationOptions = {
  tabBarLabel: 'Results',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

//PROFILE
const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};

//FORUM
const ForumStack = createStackNavigator({
  Forum: { screen: ForumScreen },
  CreateForum: { screen: CreateForum},
  Chat: {
    screen: ChatScreen,
    title: 'Chat',
    headerStyle: { backgroundColor: '#2196f3' },
    headerTintColor: '#fff',
      headerLeft: <HeaderBackButton onPress={() => this.props.navigation.goBack(null)} />
  }
}, {
  initialRouteName: 'Forum'
});

ForumStack.navigationOptions = {
  tabBarLabel: 'Forum',
  title: 'Forum',
  headerStyle: { backgroundColor: '#2196f3' },
  headerTintColor: '#fff',
  // HeaderBackButton: { color: '#fff'},
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-chatbubbles' : 'md-chatbubbles'}
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  FixturesStack,
  LeaguesStack,
  ResultsStack,
  ForumStack
  // ProfileStack,
}, { animationEnabled: true});
