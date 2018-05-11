/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, {
  Component
} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableHighlight,
  TextInput
} from 'react-native';

import API from '../network/api';
import Util from '../util/util';
import Store from 'react-native-simple-store';


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: "",
      code: "",
      logined: false,
      secondsElapsed: 0,
    }
  }
  componentDidMount() {

  }
  componentWillUnMount() {
    this.timer && clearTimeout(this.timer)
  }
  tick() {
    var secondsElapsed = this.state.secondsElapsed - 1
    if (secondsElapsed == 0) {
      this.setState({
        secondsElapsed: 0
      });
      return;
    }
    this.timer = setTimeout(
      () => {
        this.setState({
          secondsElapsed: secondsElapsed
        })
        this.tick();
      }, 500
    )

  }
  getCode() {
    var phone = this.state.phone;
    if (!this.checkPhone(phone)) {
      alert("请输入正确的手机号码")
      return;
    }
    var thiz = this;
    Util.post(API.getSmsCode('verifiycode'), {
      'tel': phone,
      'type': 'verifiycode'
    }, function(ret) {
      if (ret.code == 0) {
        thiz.setState({
          secondsElapsed: 60
        });
        thiz.tick();
      }
      Util.log(ret.msg)
    })
  }
  login() {
    var phone = this.state.phone;
    var code = this.state.code;
    if (!this.checkPhone(phone)) {
      alert("请输入正确的手机号码")
      return;
    }
    if (!this.checkCode(code)) {
      alert("验证码为4位数字");
      return;
    }
    fetch(API.LOGIN + "?user_name=" + phone + "&code=" + code + "&type=verifiycode")
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.code == 0) {
          this._loginSucc(responseData.data);
        } else {
          alert("验证码错误")
        }
      })
      .done()
  }
  _loginSucc(userData) {
    this.props.loginResult(userData);
  }
  logout() {
    this.setState({
      login: false
    })
  }
  checkPhone(phone) {
    return phone && phone.length > 10
  }
  checkCode(code) {
    return code && code.length === 4
  }
  renderLogined() {
    return (
      <View>
          <Text style={{alignItems:"center",justifyContent:"center"}}>欢迎你:user_id:{user_id} access_token:{access_token}</Text>
          <TouchableHighlight style={[styles.btn,styles.marginTop]} onPress={this.logout}>
            <Text style={{color:'#fff'}}>退出</Text>
          </TouchableHighlight>
        </View>
    );
  }
  renderLogin() {
    var getCode_text = this.state.secondsElapsed == 0 ? '获取验证码' : this.state.secondsElapsed + '秒后发送'
    return (
      <ImageBackground style={[Util.size, styles.container],{height:"100%"}} source={require("./../res/image/bg_login.jpg")}>

        <View style={styles.loginform}>
        <Text style={[styles.title,{marginTop:40}]} >用户登陆</Text>
          <View style={[styles.inputRow,{marginTop:90}]}>
            <Text style={styles.label} >手机号</Text>
            <TextInput
              keyboardType ='numeric'
              maxLength={11}
              clearButtonMode='while-editing'
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="请输入11位手机号"
              onChangeText={(text) => this.setState({phone: text})}/>
          </View>
          <View style={[styles.line]} />
          <View style={[styles.inputRow,{marginTop:10}]}>
            <Text style={styles.label}>验证码</Text>
            <TextInput
              keyboardType ='numeric'
              maxLength={4}
              clearButtonMode='while-editing'
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="4位数字"
              onChangeText={(text) => this.setState({code: text})}/>
            <TouchableHighlight style={[styles.btn,{width:80,height:30}]} underlayColor='#0057a84a' onPress={this.getCode.bind(this)}>
              <Text style={{color:'#fff',fontSize:12}}>{getCode_text}</Text>
            </TouchableHighlight>
          </View>
          <View style={[styles.line,{marginTop:2}]} />
          <TouchableHighlight style={[styles.btn,styles.marginTop30]} underlayColor='#0057a84a' onPress={this.login.bind(this)}>
            <Text style={{color:'#fff'}}>登录</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    )
  }
  render() {

    if (this.state.logined) {
      return this.renderLogined();
    } else {
      return this.renderLogin();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginform: {
    backgroundColor: 'rgba(0,0,0,0)',
    width: '100%',
    paddingLeft: 40,
    paddingRight: 40
  },
  transparent: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
  },
  action: {
    height: 50,
  },
  line: {
    height: 1,
    backgroundColor: '#ffffff',
  },
  marginleft10: {
    marginLeft: 10,
  },
  marginTop20: {
    marginTop: 20,
  },
  marginTop30: {
    marginTop: 30,
  },
  marginRight10: {
    marginRight: 10,
  },
  inputRow: {
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 35,
    borderColor: "#ccc",
    color: "#fff",
    flex: 1,
    fontSize: 14,
  },
  label: {
    width: 80,
    fontSize: 14,
    color: "#fff"
  },
  btn: {
    height: 35,
    backgroundColor: "#4d796e",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
  }
});
export default Login;