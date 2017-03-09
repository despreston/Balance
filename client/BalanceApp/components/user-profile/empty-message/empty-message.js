import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import Styles from './empty-message-styles';

function EmptyMessage ({ message }) {
  return (
    <View style={ Styles.container }>
      <Text style={ Styles.message }>{ message }</Text>
    </View>
  );
}

EmptyMessage.propTypes = {
  message: PropTypes.string.isRequired
};

export default EmptyMessage;