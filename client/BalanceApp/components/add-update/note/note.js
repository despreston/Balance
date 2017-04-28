import React, { Component, PropTypes } from 'react';
import { TextInput } from 'react-native';

import Styles from './note-styles';

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
        value={ note }
        onChange={ event => onTextChange(event.nativeEvent.text || '') }
        style={ Styles.note }
      />
    )
  }

}
