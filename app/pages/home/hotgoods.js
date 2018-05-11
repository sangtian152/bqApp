'use strict';
import React from 'react';
import Util from './../../util/util';
import GoodsDetail from '../goodsdetail';

import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
} from 'react-native';

//每个单项组件
class Product extends React.Component {
    render() {

        var item = this.props.data;
        var itemWidth = this.props.itemWidth;
        var itemsize = {
            width: itemWidth,
        };
        var imagesize = {
            width: itemWidth - 10,
            height: itemWidth - 10,
        };
        return (
            <View style={[styles.itemBlock,itemsize]}>
                <Image style={[styles.image,imagesize]} source={{uri: item.default_image?item.default_image:'http://ogd5wcvme.bkt.clouddn.com/no-img.png'}}></Image>
                <Text style={[styles.font_goodsname,styles.marginTop4]}>{item.goods_name}</Text>
                <View style={[styles.row]}>
                    <Text>倍全价: </Text>
                    <Text style = {[styles.font_bqprice,styles.flex1]}>{item.price}</Text>
                    <Image style={[styles.image,styles.image_add]} source={require("./../../res/image/cart_s.png")}></Image>
                </View>
            </View>
        );
    }
};

class HotGoods extends React.Component {
    render() {
        var collumnNum = this.props.collumnNum;

        var itemWidth = Math.floor((Util.size.width) / collumnNum);
        var size = {
            width: itemWidth,
            height: itemWidth * 1.25,
        };
        const {
            navigate
        } = this.props.navigation

        return (

            <View style={styles.container}>
                {this.props.hotgoods.map(function(product,index){
                    return (
                        <TouchableHighlight key={index} underlayColor="rgba(0,0,0,0)" onPress={()=>navigate('GoodsDetails',{spec_id:product.spec_id})}>
                            <View style={[styles.center,size]}>
                                <Product
                                    itemWidth ={itemWidth-15}
                                    data={product} />
                            </View>
                        </TouchableHighlight>
                        )
                })}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        flexWrap: 'wrap',

    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemBlock: {
        backgroundColor: 'white',
        padding: 5,
    },
    row: {
        flexDirection: 'row',
    },
    flex1: {
        flex: 1,
    },
    marginTop4: {
        marginTop: 4,
    },
    font_goodsname: {
        fontSize: 12,
        color: '#333333',
        height: 30,
    },
    font_bqprice: {
        fontSize: 16,
        color: '#ee7700',
    },
    image: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
        resizeMode: Image.resizeMode.stretch, //拉伸
    },
    image_add: {
        width: 25,
        height: 25,
    },
});

module.exports = HotGoods;