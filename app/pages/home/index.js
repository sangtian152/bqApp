/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  Component
} from 'react';
import Styles from './style'
import API from './../../network/api';
import Util from './../../util/util';
import Loading from './../loading';
import Web from './../web';

//自定义组件
import Slider from './slidebanner';
import ADViews from './adview';
import BqService from './bqservice';
import HotGoods from './hotgoods';
import {
  Text,
  View,
  Image,
  ScrollView,
  ListView,
  TouchableHighlight,
} from 'react-native';

class home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      store_id: 8805,
      loaded: false,
      banners: [],
      services: [],
      hotgoods: [],
      advs: [],
    }
  }
  componentDidMount() {

    this.getStoreMunu();
    // do anything while splash screen keeps, use await to wait for an async task.

  }
  getStoreMunu() {
    var store_id = this.props.store_id;
    var p9 = "app";
    var url = "https://api.bqmart.cn/stores/homePage?store_id=8805&p9=app";
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          banners: responseData.result.banners,
          services: responseData.result.services,
          advs: responseData.result.advs,
          loaded: true,
        });
        this.getRecommendation();
      }).done();
  }
  getRecommendation() {
    var thiz = this
    var store_id = this.state.store_id;
    var url = "https://api.bqmart.cn/goods/skuRecommend?store_string=66405&page=1&limit=18";
    var data = {
      "store_id": 62273,
      "template_id": 398,
      "rand": null,
      "page": 1
    }
    Util.get(url, function(res) {
      thiz.setState({
        hotgoods: res.result
      })

    })
  }
  renderContent() {
    if (!this.state.loaded) {
      return (<Text style={Styles.hottitle}>LOADING</Text>)
    }

    return (
      <ScrollView style={[Styles.container]}>
        <Slider banners={this.state.banners} navigation={this.props.navigation}/>
        <BqService 
            collumnNum={3}
            navigation={this.props.navigation}
            services = {this.state.services}/>
          <ADViews advs={this.state.advs} navigation={this.props.navigation}/>
          <View style={[Styles.row,Styles.center]}>
            <View style={[Styles.hotLine,Styles.flex1]}/>
              <Text style={Styles.hottitle}> 精品推荐 </Text>
            <View style={[Styles.hotLine,Styles.flex1]}/>
          </View>
          <HotGoods
            collumnNum={2}
            navigation={this.props.navigation}
            hotgoods ={this.state.hotgoods}/>
      </ScrollView>
    )
  }
  static navigationOptions = {

    title: "123456789"
  }

  render() {

    if (!this.state.loaded) {
      return <Loading loadingtext='正在加载首页...'/>
    }
    return this.renderContent();
  }
}


module.exports = home;