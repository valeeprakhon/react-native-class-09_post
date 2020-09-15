//Login.js
import React from "react";
import { View, StyleSheet, Image, TextInput,TouchableOpacity,Text,ImageBackground, Alert } from "react-native";
import { connect } from 'react-redux';
import firestore from "./firebase/Firestore"
import { saveProfile } from './actions/profile';

class Login extends React.Component{
  constructor(props){
    super(props);

    this.state={
      username:null
    }
  }

  getSuccess=(querySnapshot)=>{
    console.log("test")
    var profile;
    if(querySnapshot.docs.length>0){
      console.log(querySnapshot.size)
      querySnapshot.forEach(function(doc){
        profile = doc.data();
        profile.id = doc.id;
      });
      this.props.save(profile);
      this.props.navigation.navigate('Home')
    }else{
       Alert.alert(
        "Login fail",
        "Please check your account"
      );
    }
    
  }

  getUnsuccess=(error)=>{
    console.log(error)
    Alert.alert(
        "System error please try again !!!"
      );
  }

  onLogin=()=>{
      firestore.getAccount(this.state.username,this.getSuccess,this.getUnsuccess);
  }

  render(){
    return(
      <ImageBackground
      style={styles.imageBackground}
      source={{uri:'https://sv1.picz.in.th/images/2020/07/28/EYFj0b.jpg'}}
      blurRadius={1}>

          <View style={styles.middle} >
             <Image
                style={styles.image}
                source={{uri:'https://sv1.picz.in.th/images/2020/07/28/Ez0iOl.png'}}
              />
              <TextInput placeholder="Username" style={styles.textInput} onChangeText={txt=>{this.setState({username:txt})}}/>

              <TouchableOpacity style={styles.buttonLogin} 
                onPress={this.onLogin}>
                <Text style={{fontSize:15}}>Login</Text>
              </TouchableOpacity>

               <TouchableOpacity style={styles.buttonRegister} onPress={()=>this.props.navigation.navigate('Registration')}>
                <Text style={styles.text}>Registration</Text>
              </TouchableOpacity>
        </View>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  middle: {
    backgroundColor:'#ffffff',
    borderWidth: 1,
    padding:16,
    margin:16,
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode:'contain',
    alignSelf:'center',
    marginBottom:8
    
  },
  imageBackground:{
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  buttonLogin: {
    justifyContent:"center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    borderRadius:25,
    height: 50,
    marginBottom:8
  },
   buttonRegister: {
    justifyContent:"center",
    alignItems: "flex-end",
  },
  textInput:{
    borderRadius:25,
    height: 50, 
    borderColor: 'gray',
    borderWidth: 1,
    paddingStart:20,
    marginBottom:8
  },
  text:{
    fontSize:12,
    textDecorationLine:"underline",
    color:'blue',
    marginBottom:16
  }
  
});

const mapStateToProps = (state) => {
  return {
    profile: state.profileReducer.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    save: (profile) => dispatch(saveProfile(profile)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);