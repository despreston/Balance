import React, { Component, PropTypes } from 'react';
import { TextInput, View } from 'react-native';

import Styles from './note-styles';

export default class Note extends Component {

  static propTypes = {
    placeHolder: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    onTextChange: PropTypes.func.isRequired
  }
  
  constructor (props) {
    super(props);
  }

  render () {
    const { placeHolder, note, onTextChange } = this.props;

    return (
      <TextInput
        blurOnSubmit={ false }
        multiline
        autoFocus
        placeholder={ placeHolder }
        value={ note }
        onChange={ event => onTextChange(event.nativeEvent.text || '') }
        style={ Styles.note }
      />
    )
  }

}
