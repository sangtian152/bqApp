'use strict';
import React from 'react';
import Util from '../../util/util';
import Web from '../web';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
    } from 'react-native';

//每个单项组件
class ItemBlock extends React.Component{
    render() {

        var item = this.props.service;
        return (
            <View style={[styles.itemBlock]}>
                <Image style={[styles.image]} source={{uri: item.icon}}></Image>
                <Text style={[styles.font18]}>{item.title}</Text>
            </View>
        );
    }
};

class BqService extends React.Component{
    render(){
        var collumnNum = this.props.collumnNum;
        var services = this.props.services;
        var itemWidth = Math.floor(Util.size.width/collumnNum);
        var size ={
            width:itemWidth,
            height: itemWidth*0.75,
        };
        const {navigate} = this.props.navigation
        return(
            <View style={styles.container}>
                {services.map(function(service,index){
                    return(
                        <TouchableHighlight key={index} onPress={()=>navigate('Details',{url:service.url,title:service.title})}>
                            <View key={index} style={[styles.center,size]}>
                                <ItemBlock service={service} />
                            </View>
                        </TouchableHighlight>
                    )
                })}
            </View>
            );
    }
};

var styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        flexWrap:'wrap',
    },
    center:{
        justifyContent:'center',
        alignItems:'center',
    },
    itemBlock:{
        //backgroundColor:'red',
        borderRadius:5,
    },
    font18:{
        fontSize:14,
        color:'#333333',
        marginTop:5,
    },
    image: {
        width:50,
        height:50,
        resizeMode: Image.resizeMode.contain,
    },
});

module.exports = BqService;