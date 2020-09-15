import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class Item extends Component {

  render(props) {
    return (
      <View style={styles.containerStyle}>
          <View style={{flexDirection:"row"}}>
            <View style={{width:50,height:50,backgroundColor:this.props.color}}/>
            <View style={{flexDirection:"column",paddingStart:8}}>
              <Text> ID : {this.props.id} </Text>
              <Text> Name : {this.props.name} </Text>
            </View>
          </View>
        </View>
    );
  }
}

Item.PropTypes={
  id:PropTypes.string,
  name:PropTypes.string,
  color:PropTypes.string
}


const styles = StyleSheet.create({
   containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#DDDDDD',
    margin: 6,
    padding: 10,
  }
});