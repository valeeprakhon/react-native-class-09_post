// App.js
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Profile from './Profile'
import Chat from './Chat'
import Login from './Login'
import Registration from './Registration'
import Friend from './Friend'

import configureStore from './Store'
import {Provider} from 'react-redux'


const RegistrationScreen =()=>{
  const navigation = useNavigation();
  return (
    <Registration navigation={navigation}/>
  );
}

const LoginScreen =()=> {
  const navigation = useNavigation();
  return (
    <Login navigation={navigation}/>
  );
}

const ProfileScreen=()=> {
  const navigation = useNavigation();
  return (
    <Profile navigation={navigation}/>
  );
}

const ChatScreen=()=> {
  const navigation = useNavigation();
  return (
    <Chat navigation={navigation}/>
  );
}

const FriendScreen=()=> {
  const navigation = useNavigation();
  return (
    <Friend navigation={navigation}/>
  );
}

const Tab = createBottomTabNavigator();
const HomeScreen=()=> {
  const navigation = useNavigation();
  return (
    <Tab.Navigator  
      tabBarOptions={{
        activeTintColor: '#e91e63',
        
    }}>

      <Tab.Screen 
          name="Friend" 
          component={FriendScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons 
                name="account" 
                color={color} 
                size={size} />
            ),
          }}
      />


     <Tab.Screen 
          name="Account" 
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
            <MaterialIcons 
              name="edit" 
              size={size} 
              color={color} />
            ),
          }}
      />

    </Tab.Navigator>
  );
}


const Stack = createStackNavigator();
function MyStack() {
  return (

    
    <Stack.Navigator>
        <Stack.Screen name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}/>

        <Stack.Screen name="Registration" 
          component={RegistrationScreen} 
          options={{ headerShown: false }}/>

         <Stack.Screen name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}/>
    
      <Stack.Screen name="Chat" 
          component={ChatScreen} 
          options={{ headerShown: false }}/>

    </Stack.Navigator>
  );
}

export default class App extends Component {
  constructor(props){
    super(props);
     this.state = {
 
    };

  }
  render(props) {
    const store = configureStore;
    return (
      <Provider store={configureStore}>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </Provider>
    );
  }
}