import React, { Component, PropTypes } from 'react';
import { TextInput, View } from 'react-native';

import Styles from './note-styles';

export default class Note extends Component {

  static propTypes = {
    placeHolder: PropTypes.string.isRequired
  }
  
  constructor (props) {
    super(props);

    this.state = { textValue: '' };
  }

  onTextChange (event) {
    this.setState({ textValue: event.nativeEvent.text || '' });
  }

  render () {
    return (
      <TextInput
        blurOnSubmit={ false }
        multiline
        autoFocus
        placeholder={ this.props.placeHolder }
        value={ this.state.textValue }
        onChange={ event => this.onTextChange(event) }
        style={ Styles.note }
      />
    )
  }

}
