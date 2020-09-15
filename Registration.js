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
} from 'react-native';

import * as firebase from 'firebase';

import { saveProfile } from './actions/profile';
import { connect } from 'react-redux';

import firestore from './firebase/Firestore';



class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: null,
      lastname: null,
      studentid: null,
      username: null,
      password: null,
    };
  }

  addSuccess = (refDoc) => {
    console.log(refDoc.id);
    Alert.alert(
      "Success",
      "Add Your Account Success",
      [
        { text: "OK", onPress: () => {this.props.navigation.navigate('Login')} }
      ]
    );
  };

  addUnsuccess = (error) => {
    console.log(error);
  };


  getSuccess=(querySnapshot)=>{
    if(querySnapshot.docs.length===0){
      let account ={
        firstname:this.state.firstname,
        lastname:this.state.lastname,
        studentid:this.state.studentid,
        username:this.state.username,
        createddate:null
      }
      firestore.addAccount(account,this.addSuccess,this.addUnsuccess)
    }
    else{
       Alert.alert(
      "Unsuccess",
      "Your username already used !!!"
    );
    }
  }

  getUnsuccess=(error)=>{
    console.log(error)
  }


  onRegistration=()=>{
    let username = this.state.username;
    firestore.getAccount(this.state.username,this.getSuccess,this.getUnsuccess);
  }


  onCancel = () => {
    this.props.navigation.navigate('Login');
  };

  render(props) {
    const { navigation } = this.props;
    return (
      <ImageBackground
        style={styles.imageBackground}
        source={{ uri: 'https://sv1.picz.in.th/images/2020/07/28/EYFj0b.jpg' }}
        blurRadius={1}>
        <View style={styles.middle}>
          <View style={{ flexDirection: 'row', marginBottom: 16 }}>
            <Image
              style={styles.image}
              source={{
                uri: 'https://sv1.picz.in.th/images/2020/07/28/Ez0iOl.png',
              }}
            />
            <Text style={{ fontSize: 25, marginStart: 8, alignSelf: 'center' }}>
              Registration
            </Text>
          </View>

          <TextInput
            placeholder="First Name"
            style={styles.textInput}
            onChangeText={(txt) => {
              this.setState({ firstname: txt });
            }}
          />

          <TextInput
            placeholder="Last Name"
            style={styles.textInput}
            onChangeText={(txt) => {
              this.setState({ lastname: txt });
            }}
          />

          <TextInput
            placeholder="StudentID"
            style={styles.textInput}
            onChangeText={(txt) => {
              this.setState({ studentid: txt });
            }}
          />

          <TextInput
            placeholder="Username"
            style={styles.textInput}
            onChangeText={(txt) => {
              this.setState({ username: txt });
            }}
          />

          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={this.onRegistration}>
            <Text style={{ fontSize: 15 }}>Registor</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonLogin} onPress={this.onCancel}>
            <Text style={{ fontSize: 15 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  middle: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    padding: 16,
    margin: 16,
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 8,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  buttonLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 25,
    height: 50,
    marginBottom: 8,
  },
  textInput: {
    borderRadius: 25,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingStart: 20,
    marginBottom: 8,
  },
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
export default connect(mapStateToProps, mapDispatchToProps)(Registration);
