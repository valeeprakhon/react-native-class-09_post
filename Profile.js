//Registration.js
import React, { Component } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  Image,
  Button,
  ImageBackground,
  TextInput,
  Platform
} from 'react-native';

import * as firebase from 'firebase';
import { Entypo } from '@expo/vector-icons';

import { saveProfile } from './actions/profile';
import { connect } from 'react-redux';
import firestore from './firebase/Firestore';
import Constants from 'expo-constants';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.profile.firstname,
      lastname: this.props.profile.lastname,
      studentid: this.props.profile.studentid,
      username: this.props.profile.username,
      password: null,
    };
    this.account= null;
  }

  updateSuccess(){
     Alert.alert(
        "Update Success",
        "Update your account success"
    );
  }
  updateUnSuccess(error){
    console.log(error)
  }

  onSave=()=>{
    let account={
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      studentid: this.state.studentid,
      username: this.state.username,
      id:this.props.profile.id
    };

    firestore.updateAccount(account,this.updateSuccess,this.updateUnSuccess)
  }

  Header = () =>{
    return(
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://sv1.picz.in.th/images/2020/07/28/Ez0iOl.png',
          }}/>
        <TouchableOpacity onPress={this.onSave}> 
          <Text style={styles.headerText}>Edit Account</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render(props) {
    const { navigation } = this.props;
    return (
      <View style={{backgroundColor:"white", flex:1,paddingTop: Platform.OS==='ios'? Constants.statusBarHeight:0}}>

        <this.Header/>

        <View style={styles.middle}>
          
          <TextInput
            placeholder="First Name"
            style={styles.textInput}
            value={this.state.firstname}
            onChangeText={(txt) => {
              this.setState({ firstname: txt });
            }}
          />

          <TextInput
            placeholder="Last Name"
            style={styles.textInput}
            value={this.state.lastname}
            onChangeText={(txt) => {
              this.setState({ lastname: txt });
            }}
          />

          <TextInput
            placeholder="StudentID"
            style={styles.textInput}
            value={this.state.studentid}
            onChangeText={(txt) => {
              this.setState({ studentid: txt });
            }}
          />

          <TextInput
            placeholder="Username"
            style={styles.textInput}
            value={this.state.username}
            onChangeText={(txt) => {
              this.setState({ username: txt });
            }}
          />

          <TouchableOpacity style={styles.button} 
            onPress={this.onSave}>
            <Text style={{fontSize:15}}>Save</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  middle: {
    padding: 16,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginLeft:8,
    marginRight:8
  },
  textInput: {
    borderRadius: 25,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingStart: 20,
    marginBottom: 8,
    backgroundColor:"#FFFFFF"
  },
  header:{
    flexDirection:'row',
    backgroundColor: '#FFFFFF',
    alignItems:'center',
    height:70,
    borderBottomWidth:1,
    borderBottomColor:"gray",
  },
  headerText :{
    fontSize : 25
  },
  button: {
    justifyContent:"center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    borderRadius:25,
    height: 50,
    marginBottom:8
  }
});

const mapStateToProps = (state) => {
  return {
    profile: state.profileReducer.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    save: (profile) => dispatch(saveProfile(profile)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
