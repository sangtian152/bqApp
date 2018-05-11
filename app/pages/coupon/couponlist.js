/**
 * Created by Administrator on 5/27/2017.
 */

import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
} from 'react-native';
import {
	TabNavigator,
	StackNavigator
} from 'react-navigation';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#eee',
	},
	welcome: {
		fontSize: 25,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

class RecentChatsScreen extends React.Component {
	render() {
		return <Text>List of recent chats </Text>
	}
}

export default RecentChatsScreen;