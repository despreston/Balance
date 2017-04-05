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

    this.state = { comment: '' };
  }

  onChange (comment) {
    this.setState({ comment });
  }

  render () {
    const { onSend } = this.props;

    return (
      <View style={ Styles.container }>
        <TextInput
          placeholder='Write a comment'
          value={ this.state.comment }
          onChange={ event => this.onChange(event.nativeEvent.text || '') }
          style={ Styles.input }
        />
        <TouchableOpacity onPress={ () => onSend(this.state.comment) }>
          <Text style={ Styles.send }>Send</Text>
        </TouchableOpacity>
      </View>
    )
  }
}