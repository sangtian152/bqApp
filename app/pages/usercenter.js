'use strict';
import React from 'react';
import AddresManager from './address/addresslist';
import OrderManager from './order/orderlist';
import CouponManager from './coupon/couponlist';
import ShellManager from './shell/shell';
import Login from './login';
import store from 'react-native-simple-store';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	Image,
	TouchableHighlight,
} from 'react-native';
class UserCenter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			goods: null,
		}
	}
	static navigationOptions = function({
		navigation
	}) {
		return {
			headerTitle: navigation.state.params.title
		}
	}
	componentDidMount() {

	}

	_renderHTML(web) {
		if (web === "AddresManager") {
			return (<AddresManager />)
		}
		if (web === "OrderManager") {
			return (<OrderManager />)
		}
		if (web === "CouponManager") {
			return (<CouponManager />)
		}
		if (web === "ShellManager") {
			return (<ShellManager />)
		}
		if (web === "Login") {
			return (<Login />)
		}
	}
	render() {
		const {
			params
		} = this.props.navigation.state;
		var Page = this._renderHTML(params.page)
		return (
			<View style={styles.container,{height:"100%"}}>
				{Page}
			</View>
		);
	}
};


var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f9f9f9',
		marginBottom: 100,
	},
	thumb: {
		width: 60,
		height: 60,
		marginRight: 10
	},
	line1: {
		height: 1,
		backgroundColor: '#dadce2'
	},
	line10: {
		height: 10,
		backgroundColor: '#ebeef1'
	},
	textprimary: {
		fontSize: 18,
		color: '#4a4d52',
	},
	textsecond: {
		fontSize: 18,
		color: '#929aa2',
	},
	textPrice: {
		fontSize: 18,
		color: '#fb7e00',
	},
	marginTop10: {
		marginTop: 15,
	},
	marginTB: {
		marginTop: 10,
		marginBottom: 10,
	},
	paddingLeftRight: {
		paddingLeft: 10,
		paddingRight: 10,
	},
	scrollSpinner: {
		marginVertical: 20,
	},
	rowSeparator: {
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		height: 10,
	},
	rowSeparatorHide: {
		opacity: 0.0,
	},
	line: {
		height: 1,
		backgroundColor: '#eef0f3',
	},
	row: {
		flexDirection: 'row',
	},
});

module.exports = UserCenter;