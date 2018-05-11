/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  Component
} from 'react';
import Store from 'react-native-simple-store';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';
import {
  StackNavigator
} from 'react-navigation'; // 1.0.0-beta.14
import Login from './pages/login';
import Index from './pages/index';
import Web from './pages/web';
import GoodsDetails from './pages/goodsdetail';
import UserCenter from './pages/usercenter';
const shoppingApp = StackNavigator({
  Home: {
    screen: Index,

  },
  Details: {
    screen: Web,
  },
  GoodsDetails: {
    screen: GoodsDetails,
    navigationOptions: {
      header: null
    },
  },
  UserCenter: {
    screen: UserCenter,
  },

});

export default shoppingApp;