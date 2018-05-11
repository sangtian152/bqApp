'use strict';

import React from 'react';
import Styles from './style';

import Web from '../web';

import {
    View,
    Image,
    TouchableHighlight,
    } from 'react-native';

class ADViews extends React.Component{

    _loadWeb(title,loadurl,headerTitle){
        const {navigate} = this.props.navigation
        navigate(title,{url:loadurl,title:headerTitle})
    }

    render() {
        var advViews = [];
        var advs = this.props.advs;
        var thiz = this;
        return (
            <View>
                {advs.map(function(adv,index){
                    return (
                        <TouchableHighlight key={index} onPress={()=>thiz._loadWeb('Details',adv.link_url,adv.ad_name)}>
                            <View>
                                <View style={{height:10,backgroundColor:'#eef0f3'}} />
                                <Image style={[Styles.adv]} source={{uri:adv.ad_img}} />
                            </View>
                        </TouchableHighlight>
                    )
                })}
            </View>
        );
    }
};

module.exports = ADViews;