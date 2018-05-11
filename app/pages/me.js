'use strict';
import React from 'react';
import AddresManager from './address/addresslist';
import OrderManager from './order/orderlist';
import CouponManager from './coupon/couponlist';
import ShellManager from './shell/shell';
import store from 'react-native-simple-store';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  LinkingIOS,
  TouchableHighlight,
  ActionSheetIOS,
  ImageBackground,
  NavigatorIOS,
} from 'react-native';

class MenuItem extends React.Component {
  _performClick() {
    var onClick = this.props.onClick;
    if (onClick) {
      onClick();
    }
  }

  render() {
    var margin2Top = parseInt(this.props.margin2Top);
    return (
      <TouchableHighlight underlayColor="#dad9d7" onPress={this._performClick.bind(this)}>
        <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#ffffff',height:45,marginTop:margin2Top,paddingLeft:20,paddingRight:20}}>
          <Image style={[styles.iconSize]}
            source={{uri:this.props.icon}} />
          <Text  style={{flex:1,color:'#333333',marginLeft:10}}>{this.props.title}</Text>
          <Image style={[styles.iconSize]}
            source={require("./../res/image/arrow.png")} />
        </View>
      </TouchableHighlight>
    );
  }
};
class Me extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    store.get('user').then((userdata) => {
      this.setState({
        user: userdata,
      })
    });
  }

  _addNavigator(component, dataObj) {
    var data = null;
    const {
      navigate
    } = this.props.navigation;
    navigate(component, dataObj)

  }

  _call() {
    LinkingIOS.openURL('tel://4007008780');
  }

  render() {
    var thiz = this;
    var name = "";
    if (this.state.user) {
      name = this.state.user.user_name;
    }
    return (
      <ScrollView style={{backgroundColor:'#eef0f3'}}>
        <View style={[styles.container]}>
            <ImageBackground source={require("./../res/image/bg_login.jpg")} style={[styles.header,styles.center]} >
            <View style={styles.transparent}>
                <Image style={[styles.logoSize,styles.borderRadius]}
                       source={require("./../res/image/head.jpg")} />
                <TouchableHighlight onPress={function(){thiz._addNavigator('UserCenter',{page:"Login",title:"登录"})}}>
                    <View style={{alignItems:'center'}}>
                        <Text style={styles.userName}>登录</Text>
                    </View>
                </TouchableHighlight>
            </View>
          </ImageBackground>
         </View>

        <MenuItem 
          title='地址管理'
          icon="require(./../res/image/market_n.png)"
          onClick={function(){thiz._addNavigator('UserCenter',{page:"AddresManager",title:"地址管理"})}}/>
        
        <MenuItem
          title='我的订单'
          margin2Top='1'
          icon="require(./../res/image/market_n.png)"
          onClick={function(){thiz._addNavigator('UserCenter',{page:"OrderManager",title:"订单列表"})}}/>

        <MenuItem
          title='我的红包'
          margin2Top='1'
          icon="require(./../res/image/market_n.png)"
          onClick={function(){thiz._addNavigator('UserCenter',{page:"CouponManager",title:"红包"})}}/>

        <MenuItem
          title='我的贝壳'
          margin2Top='1'
          icon="require(./../res/image/market_n.png)"
          onClick={function(){thiz._addNavigator('UserCenter',{page:"ShellManager",title:"我的贝壳"})}}/>

        <TouchableHighlight 
          style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',height:45,marginTop:30}} 
          underlayColor="#dad9d7" onPress={()=>this._call()}>
         <Text >拨打客服400-700-8780</Text>
        </TouchableHighlight>

      </ScrollView>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    color: '#ffffff',
    fontSize: 20,
  },
  transparent: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  header: {
    height: 100,
  },
  iconSize: {
    height: 20,
    width: 20,
    resizeMode: Image.resizeMode.contain,
  },
  logoSize: {
    height: 50,
    width: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#fff",
  },
});

module.exports = Me;