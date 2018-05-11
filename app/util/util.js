import React,{Component} from 'react'
import Dimensions from 'Dimensions'
import {
	PixelRatio
} from 'react-native';
const Util = {
	Pixel: 1/PixelRatio.get(),
	size: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height
	},
	post:function(url,data,callback){
		var fetchOptions = {
			method:"POST",
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		};
		fetch(url,fetchOptions)
		.then((response)=>response.text())
		.then((responseText)=>{
			callback(JSON.parse(responseText));
		}).done();
	},
	get:function(url,callback){
		fetch(url)
		.then((response)=>response.text())
		.then((responseText)=>{
			callback(JSON.parse(responseText));
		})
		.done();
	},
	log:function(obj){
		var description = "";
		for(var i in obj){
			var property = obj[i];
			description += i + "=" + property + "\n";
		}
		alert(description);
	},
	//Key
  key: 'HSHHSGSGGSTWSYWSYUSUWSHWBS-REACT-NATIVE'
}
module.exports = Util;