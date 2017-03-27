import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import Styles from './empty-message-styles';

function EmptyMessage ({ message }) {
  return <Text style={ Styles.message }>{ message }</Text>;
}

EmptyMessage.propTypes = {
  message: PropTypes.string.isRequired
};

export default EmptyMessage;