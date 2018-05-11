/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-10-19 18:09:57
 * @version $Id$
 */
 
'use strict';
import React from 'react';

import {
  	StyleSheet,
  	View,
    Text,
} from 'react-native';

class Loading extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Text>{this.props.loadingtext}</Text>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = Loading;