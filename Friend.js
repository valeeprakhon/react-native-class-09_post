//Login.js
import React from "react";
import { Platform, View, StyleSheet, Image, TextInput,TouchableOpacity,Text,ImageBackground, Alert,FlatList } from "react-native";
import { connect } from 'react-redux';
import firestore from "./firebase/Firestore"
import { saveProfile } from './actions/profile';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import Item from './Item'

class Friend extends React.Component{
  constructor(props){
    super(props);

    this.state={
      username:null,
      items:[],
      chatID:[]
    }
  }

  getFriendAccountSuccess=(doc)=>{
    console.log("test")
    console.log(doc.data())
    let account = doc.data();
    account.id = doc.id;
    this.setState({items:this.state.items.concat(account)});
    console.log()
  }

  getFriendSuccess=(querySnapshot)=>{
    if(querySnapshot.docs.length>0){
      var myID = this.props.profile.id;
      this.setState({items:[]});
      var friend=[]
      querySnapshot.forEach(function(doc){
        let friendID = null
        if(doc.data().friend[0]==myID){
          friendID = doc.data().friend[1];
        }else{
          friendID = doc.data().friend[0];
        }
        friend.push(friendID);
      });
      
      for(let i=0;i<friend.length;i++){
        firestore.getAccountWithID(friend[i],this.getFriendAccountSuccess,this.unsucess);
      }
    }
  }


  componentDidMount=()=>{
    firestore.getFriend(this.props.profile.id,this.getFriendSuccess,this.unsucess);
  }

  addSuccess=(doc)=>{
    firestore.getFriend(this.props.profile.id,this.getFriendSuccess,this.unsucess);
  }

  getSuccess=(querySnapshot)=>{
    if(querySnapshot.docs.length>0){
      let friendProfile={};
      querySnapshot.forEach(function(doc){
        friendProfile.id = doc.id;
      });
      let friend = {friend:[this.props.profile.id, friendProfile.id]};
      firestore.addFriend(friend,this.addSuccess,this.unsucess);
    }

  }

  unsucess=(error)=>{
    console.log(error);
  }

  onAdd=()=>{

    firestore.getAccount(this.state.username,this.getSuccess,this.unsucess);
    
    /*
    let user ={
      userName:"Test"
    }
    this.setState({items:this.state.items.concat(user)})
    
    console.log(this.props.profile)
    */
  }
  

  Header = () =>{
      return(
        <View style={styles.header}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://sv1.picz.in.th/images/2020/07/28/Ez0iOl.png',
            }}/>

          <View style={styles.searchView}>
            <TextInput placeholder="Friend User" style={styles.searchInput} onChangeText={txt=>{this.setState({username:txt})}}/>

          <TouchableOpacity style={{paddingRight:8,paddingLeft:8}} onPress={this.onAdd}>
            <Ionicons name="ios-add-circle" size={40} color="#A9A9A9"  />
          </TouchableOpacity>

          </View>
        </View>
      );
  }


  renderItem=({item})=>{
    return(
      <View>
        <TouchableOpacity style={{backgroundColor:"white",borderColor:"gray", borderWidth: 1}}>
          <View style={styles.item}>
            <View style={{width:60,height:60,borderRadius:30,backgroundColor:"red"}}/>
            <View style={{paddingLeft:8, flex:1}}>
	            <Text style={styles.title}>{item.username}</Text>
              <Text>{item.firstname+" "+item.lastname}</Text>
              <Text>{item.studentid}</Text>
            </View>
	        </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 8,
        }}
      />
    );
  };

  render(){
    return(
      <View style={{paddingTop: Platform.OS==='ios'? Constants.statusBarHeight:0}}>
        <this.Header/>
        <View>
          <FlatList
            data={this.state.items}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginLeft:8,
    marginRight:8
  },
  searchInput:{
    borderRadius:25,
    height: 50, 
    borderColor: 'gray',
    flex:1,
    paddingStart:10
  },
  searchView:{
    flex:1,
    flexDirection:"row",
    borderRadius:25,
    height: 50, 
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent:"center",
    alignItems:"center",
    marginEnd:8
    
  }
  ,
    header:{
    flexDirection:'row',
    backgroundColor: '#FFFFFF',
    alignItems:'center',
    height:70,
    borderBottomWidth:1,
    borderBottomColor:"gray",
  },
  item: {
    flexDirection:'row',
    padding: 10,
    marginVertical: 8,
  },
  title: {
	  fontSize: 18
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

export default connect(mapStateToProps, mapDispatchToProps)(Friend);