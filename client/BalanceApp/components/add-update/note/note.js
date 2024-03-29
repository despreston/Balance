import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TextInput } from 'react-native';

import Styles from './note-styles';
import Colors from '../../colors';

export default class Note extends Component {

  static propTypes = {
    placeHolder: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    onTextChange: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool
  }
  
  constructor (props) {
    super(props);
  }

  render () {
    const { placeHolder, note, onTextChange, autoFocus } = this.props;

    return (
      <TextInput
        autoFocus={ autoFocus }
        blurOnSubmit={ false }
        multiline
        placeholder={ placeHolder }
        placeholderTextColor={ Colors.gray.silver }
        value={ note }
        onChange={ event => onTextChange(event.nativeEvent.text || '') }
        style={ Styles.note }
      />
    )
  }

}
