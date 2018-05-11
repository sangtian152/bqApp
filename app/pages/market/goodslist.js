/**
 * Created by Administrator on 5/27/2017.
 */

import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	Button,
	ListView,
	Platform,
	FlatList,
	ProgressBarAndroid
} from 'react-native';
import {
	TabNavigator,
	StackNavigator
} from 'react-navigation';
import Util from './../../util/util';
import API from './../../network/api';
import Loading from './../loading';
import Global from './../../util/global';
import GoodsList from './goodslist'
import RefreshListView, {
	RefreshState
} from './RefreshListView'
class goodslist extends React.Component {
	state: {
		dataList: Array < any > ,
		refreshState: number,
	}
	constructor(props) {
		super(props);

		this.state = {
			cateId: null,
			page: 1,
			limit: 8,
			refreshState: RefreshState.Idle,
			goodsList: {
				dataSource: [],
				loaded: false,
				loadingmore: false,
				refreshing: false, //当前的刷新状态
			}
		};
	}
	componentWillMount() {
		this.setState({
			cateId: this.props.cateId
		})
	}
	componentDidMount() {
		// const CateId = this.props.cateId
		this._fetchGoodsByCategory();

	}
	_fetchGoodsByCategory() {
		var thiz = this;
		this.setState({
			refreshState: RefreshState.FooterRefreshing
		})
		var params = {
			'store_id': 8805,
			'page': this.state.page,
			'limit': this.state.limit,
			'cate_id': this.state.cateId
		};
		Util.post(API.GOODSLIST, params,
			function(ret) {
				thiz._setGoodsList(ret.data, false);
			});
	}

	_setGoodsList(goodsList, isReload) {
		let page = this.state.page + 1;
		let limit = this.state.limit
		let hasMoreData = true;
		let newList = isReload ? goodsList : [...this.state.goodsList.dataSource, ...goodsList]
		if (goodsList.length < limit) {
			hasMoreData = false;
		}
		this.setState({
			page: page,
			goodsList: {
				dataSource: newList,
				loaded: true,
				loadingmore: true,
			},
			refreshState: hasMoreData ? RefreshState.Idle : RefreshState.NoMoreData,
		});
	}
	/**
	 * 下拉属性
	 */
	_onRefresh() {
		var thiz = this;
		//设置刷新状态为正在刷新
		this.setState({
			page: 1,
			goodsList: {
				refreshing: true,
			},
			refreshState: RefreshState.Idle

		});
		var params = {
			'store_id': 8805,
			'page': 1,
			'limit': this.state.limit,
			'cate_id': this.state.cateId
		};
		Util.post(API.GOODSLIST, params,
			function(ret) {
				thiz._setGoodsList(ret.data, true);
			});
	}
	keyExtractor(item: any, index: number) {
		return index
	}
	renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
		var style = styles.rowSeparator;
		if (adjacentRowHighlighted) {
			style = [style, styles.rowSeparatorHide];
		}
		return (
			<View key={"SEP_" + sectionID + "_" + rowID}  style={style}/>
		);
	}

	renderFooter() {
		if (!this.state.goodsList.loadingmore) {
			if (Platform.OS === 'ios') {
				return <ActivityIndicatorIOS style={styles.scrollSpinner} />;
			} else {
				return (
					<View  style={{alignItems: 'center'}}>
              <ProgressBarAndroid styleAttr="Large" style={{marginTop:10}}/>
            </View>);
			}
		} else {
			return (
				<View style={styles.textWrap}>
					<Text style={{color:'#626770'}}>全部商品加载完毕</Text>
				</View>
			)
		}
	}
	_renderGoodsList(rowData) {
		return (
			<View>
		        <View style={styles.rowContainer}>
		          <Image style={styles.thumb} source={{ uri: rowData.item.default_image?rowData.item.default_image:'http://ogd5wcvme.bkt.clouddn.com/no-img.png' }} />
		          <View style={{flex:1}}>
		            <Text style={{flex:1}}>{rowData.item.goods_name}</Text>
		            <View style={{flexDirection:'row',alignItems:'flex-end',}}>
		              <Text style={{color:'#626770'}}>倍全价:</Text>
		              <Text style={{color:'#f28006',flex:1}}>{rowData.item.shichang}</Text>
		              <Image style={{height:25,width:25,marginRight:10}} source={require("./../../res/image/cart_s.png")}/>
		            </View>
		          </View>
		        </View>
		        <View style={styles.line}/>
		      </View>
		);
	}
	render() {
		var goodsListLoading = null;
		return (
			<View style={styles.container}>
		        <View style={{flex:3}}>
		          {goodsListLoading}

		          
					
				  <RefreshListView
                    data={this.state.goodsList.dataSource}
                    keyExtractor={this.keyExtractor}
                    renderItem={this._renderGoodsList.bind(this)}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this._onRefresh.bind(this)}
                    onFooterRefresh={this._fetchGoodsByCategory.bind(this)}

                    // 可选
                    footerRefreshingText= '玩命加载中 >.<'
                    footerFailureText = '我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText= '-我是有底线的-'
                />


		        </View>
		      </View>
		);
	}
}
var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#eef0f3',
	},
	textWrap: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 5,
		paddingBottom: 5
	},
	rowSeparator: {
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		height: 1,
		marginLeft: 4,
	},
	rowSeparatorHide: {
		opacity: 0.0,
	},
	scrollSpinner: {
		marginVertical: 20,
	},
	thumb: {
		width: 70,
		height: 70,
		marginRight: 10
	},
	line: {
		backgroundColor: '#eef0f3',
		height: 1,
	},
	textContainer: {
		flex: 1
	},
	price: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#48BBEC'
	},
	title: {
		fontSize: 20,
		color: '#656565'
	},
	rowContainer: {
		flexDirection: 'row',
		padding: 10,
		height: 90,
		justifyContent: 'center',
	}
});
export default goodslist;