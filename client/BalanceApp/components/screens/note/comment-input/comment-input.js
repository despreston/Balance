import React, { Component, PropTypes } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard
} from 'react-native';
import Styles from './comment-input-styles';

export default class CommentInput extends Component {

  static propTypes = {
    onSend: PropTypes.func.isRequired,
    onRef: PropTypes.func.isRequired,
    replyingTo: PropTypes.object,
    onBlur: PropTypes.func.isRequired
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
    Keyboard.dismiss();
    this.setState({ comment: '', valid: false });
  }

  render () {
    return (
      <View style={ Styles.container }>
        {
          this.props.replyingTo &&
          (
            <Text style={ Styles.replyingTo }>
              Replying to { this.props.replyingTo.username }
            </Text>
          )
        }
        <View style={ Styles.inputContainer }>
          <TextInput
            ref={ this.props.onRef }
            placeholder='Write a comment'
            value={ this.state.comment }
            onBlur={ this.props.onBlur }
            onChange={ event => this.onChange(event.nativeEvent.text || '') }
            style={ Styles.input }
            maxLength={ 250 }
          />
          <TouchableOpacity
            onPress={ () => this.send() }
            disabled={ !this.state.valid }
          >
            <Text style={[ Styles.send, this.sendBtnStyle() ]}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
