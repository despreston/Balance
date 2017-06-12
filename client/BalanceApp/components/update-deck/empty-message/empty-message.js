import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './empty-message-styles';

class EmptyMessage extends Component {
  
  render () {
    return (
      <View style={ styles.container }>
        <View style={ styles.overlay } />
        <Text style={ styles.text }>Nothing completed yet!</Text>
      </View>
    );
  }

}

export default EmptyMessage;