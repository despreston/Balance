import React, { Component, PropTypes } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Styles from './mark-done-styles';

export default class MarkDone extends Component {

  render () {
    return (
      <TouchableOpacity onPress={ () => null } style={ Styles.container }>
        <Image
          source={ require('../../../../assets/icons/checkmark.png')}
          style={{ height: 20, width: 20}}/>
      </TouchableOpacity>
    );
  }

}