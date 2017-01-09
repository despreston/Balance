'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class MainScene extends Component {
  render() {
    return (
      <View>
        <Text>Current Scene: {this.props.title}</Text>
      </View>
      )
  }
}

MainScene.propTypes = {
  title: PropTypes.string.isRequired,
  onForward: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};