import React, {
  Component
} from 'react';
import ScrollableTabView, {
  ScrollableTabBar
} from 'react-native-scrollable-tab-view';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  InteractionManager,
  StatusBar,
  Platform,
} from 'react-native';
import Util from './../../util/util';
import API from './../../network/api';
import Loading from './../loading';
import Global from './../../util/global';
import GoodsList from './goodslist'
/**
商品
**/
var resultsCache = {
  dataForCategory: {},
  dataForGoods: {},
  totalForGoods: {},
};
export default class market extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store_id: 66405,
      loaded: false,
      goodsList: {

        loaded: false,
        loadingmore: false,
      },
    };
  }
  componentDidMount() {
    this._fetchData();
    InteractionManager.runAfterInteractions(() => {
      //
      console.log('InteractionManager....MyMessage');
    });
  }
  //加载网络数据
  _fetchData() {
    var thiz = this;

    Util.post(API.CATEGORYLIST, {
        'store_id': '8805'
      },
      function(ret) {
        if (ret.code == 0 && ret.data.assortment.length > 0) {
          resultsCache.dataForCategory = ret.data.assortment;
          thiz.setState({
            loaded: true,
          });
        }
      });
  }
  render() {
    if (!this.state.loaded) {
      return <Loading loadingtext='正在加载商品分类...'/>
    };
    const {
      navigator
    } = this.props;
    return (
      <View style={styles.container}>
      <StatusBar
       backgroundColor='#1a191f'
       barStyle='light-content'
       animated={true}
       hidden={false}
      />
      {Platform.OS=='ios'?<View style={{height:15,backgroundColor:'#30a630'}}/>:null}
      <ScrollableTabView
      initialPage={0}
      scrollWithoutAnimation={true}
      renderTabBar={()=><ScrollableTabBar
                    underlineStyle={styles.lineStyle}
                    activeTextColor='#fff'
                    inactiveTextColor='rgba(255, 255, 255, 0.7)'
                    underlineHeight={0}
                    textStyle={{ fontSize: 15 }}
                    tabStyle={{ paddingBottom: 0 }}
                    backgroundColor='#30a630'
                    tabStyle={{paddingLeft:12,paddingRight:12}}
                   />}
      >
      {resultsCache.dataForCategory.map(function(category,index){
        return (
            <GoodsList key={index} cateId={category.cate_id} tabLabel={category.cate_name} goods_name={category.cate_name} style={styles.itemLayout} />
          )
      })}
     </ScrollableTabView>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00C100',
  },
  lineStyle: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  itemLayout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});