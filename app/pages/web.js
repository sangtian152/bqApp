'use strict'
import React from 'react';
import {
	StyleSheet,
	View,
	WebView,
} from 'react-native';

class Web extends React.Component {
	constructor(props) {
		super(props)
		const {
			params
		} = this.props.navigation.state;

		this.state = {
			url: params.url,
			title: params.title
		}
	}
	componentDidMount() {

	}
	static navigationOptions = function({
		navigation
	}) {
		return {
			headerTitle: navigation.state.params.title
		}
	}
	render() {

		var url = this.state.url;
		var webView = null;
		if (url) {
			webView = <WebView source={{uri:url}} />
		}
		return (
			<View style={{flex:1}}>
				{webView}
			</View>
		)
	}
}
var styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 60,
	},
});
module.exports = Web;