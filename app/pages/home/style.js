'use strict';
import React from 'react';

import {
  	StyleSheet,
    Image,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    
  },
  //slider
  row:{
    flexDirection:'row',
  },
  wrapper: {
    height:150,
  },
  flex1:{
    flex:1,
  },
  center:{
    alignItems:'center',
    justifyContent: 'center',
  },
  slide: {
    height:150,
    resizeMode: Image.resizeMode.stretch,
  },
  adv: {
    height:145,
    resizeMode: Image.resizeMode.stretch,
  },
  hotLine:{
    height:1,
    backgroundColor:'#333333',
  },
  hottitle:{
    fontSize: 16,
    textAlign: 'center',
  },
  container_bqservice:{
    padding:10,
  },
  inputRow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center',
    marginBottom:10,
  },
   welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  itemRow:{
    flexDirection:'row',
    marginBottom:2,
  },

});

module.exports = styles;