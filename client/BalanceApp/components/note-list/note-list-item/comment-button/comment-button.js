import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Styles from './comment-button-styles';

export default class CommentButton extends Component {

  static propTypes = {
    count: PropTypes.number.isRequired
  }

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <View style={ Styles.container }>
        <Image
          source={ require('../../../../assets/icons/comment.png') }
          style={ Styles.icon }
        />
        <View style={ Styles.countContainer }>
          <Text style={ Styles.count }>{ this.props.count }</Text>
        </View>
      </View>
    );
  }

}