import React, { Component, PropTypes } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';

// styles
import Styles from './comment-input-styles';

export default class CommentInput extends Component {

  static propTypes = {
    onSend: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);

    this.state = { comment: '', valid: false };
  }

  onChange (comment) {
    this.setState({ comment, valid: (comment !== '') });
  }

  sendBtnStyle () {
    return this.state.valid ? Styles.valid : Styles.invalid;
  }

  send () {
    this.props.onSend(this.state.comment);

    this.setState({ comment: '', valid: false });
  }

  render () {
    return (
      <View style={ Styles.container }>
        <TextInput
          placeholder='Write a comment'
          value={ this.state.comment }
          onChange={ event => this.onChange(event.nativeEvent.text || '') }
          style={ Styles.input }
        />
        <TouchableOpacity
          onPress={ () => this.send() }
          disabled={ !this.state.valid }
        >
          <Text style={[ Styles.send, this.sendBtnStyle() ]}>Send</Text>
        </TouchableOpacity>
      </View>
    )
  }
}