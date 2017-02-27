// vendors
import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
  Text
} from 'react-native';

// styles
// import { Styles } from './profile-info-styles';

function LeftDrawerMenuItem ({ navigate, title }) {

  return (
    <TouchableOpacity
      onPress={() => navigate(title) }
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );

}

LeftDrawerMenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired
};

export default LeftDrawerMenuItem;