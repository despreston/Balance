import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import Styles from './comment-button-styles';

export default class CommentButton extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired
  }

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <TouchableOpacity style={ Styles.container } onPress={ () => this.props.onPress() }>
        <Image
          source={ require('../../../../assets/icons/comment.png') }
          style={ Styles.icon }
        />
        <View style={ Styles.countContainer }>
          <Text style={ Styles.count }>{ this.props.count }</Text>
        </View>
      </TouchableOpacity>
    );
  }

}