/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  Component
} from 'react';
import {
  TextInput
} from 'react-native'
import Home from './home/index';
import Me from './me';
import Market from './market/index';
import {
  StackNavigator,
  TabBarBottom,
  TabNavigator
} from "react-navigation";
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

class Index extends React.Component {
  static navigationOptions = {
    tabBarLabel: '首页',
    tabBarIcon: ({
      focused,
      tintColor
    }) => (
      <Image
        source={focused ? require('./../res/image/home_s.png') : require('./../res/image/home_n.png')}
        style={{ width: 26, height: 26 }}
      />
    )
  };
  render() {
    return (
      <View style={styles.container}>
        <Home navigation={this.props.navigation}/>
      </View>
    );
  }
}
class Circle extends React.Component {
  static navigationOptions = {
    tabBarLabel: '闪送超市',
    tabBarIcon: ({
      focused,
      tintColor
    }) => (
      <Image
        source={focused ? require('./../res/image/cart_s.png') : require('./../res/image/cart_n.png')}
        style={{ width: 26, height: 26 }}
      />
    )
  };
  render() {
    return (
      <View style={styles.container}>
        <Market />
      </View>
    );
  }
}

class Cat extends React.Component {
  static navigationOptions = {
    tabBarLabel: '购物车',
    tabBarIcon: ({
      focused,
      tintColor
    }) => (
      <Image
        source={focused ? require('./../res/image/market_s.png') : require('./../res/image/market_n.png')}
        style={{ width: 26, height: 26 }}
      />
    )
  };
  render() {
    return (
      <View>
          
      </View>
    );
  }
}
class Mypage extends React.Component {
  static navigationOptions = {
    tabBarLabel: '个人中心',
    tabBarIcon: ({
      focused,
      tintColor
    }) => (
      <Image
        source={focused ? require('./../res/image/me_s.png') : require('./../res/image/me_n.png')}
        style={{ width: 26, height: 26 }}
      />
    )
  };
  render() {
    return (
      <View> 
        <Me navigation={this.props.navigation}/>
      </View>
    );
  }
}
const RootIndex = TabNavigator({
  Home: {
    screen: Index,
  },
  Circle: {
    screen: Circle,
  },
  Cat: {
    screen: Cat,
  },
  Mypage: {
    screen: Mypage,
  },
}, {
  tabBarOptions: {

    activeTintColor: '#00C100',
    inactiveTintColor: '#000',
    showIcon: true,
    showLabel: true,
    upperCaseLabel: false,
    pressColor: '#823453',
    pressOpacity: 0.8,
    style: {
      backgroundColor: '#fff',
      paddingBottom: 0,
      borderTopWidth: 0.5,
      borderTopColor: '#ccc',
    },
    labelStyle: {
      fontSize: 12,
      margin: 1
    },
    indicatorStyle: {
      height: 0
    }, //android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
  },
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  lazy: true,
  backBehavior: 'none',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});
module.exports = RootIndex;