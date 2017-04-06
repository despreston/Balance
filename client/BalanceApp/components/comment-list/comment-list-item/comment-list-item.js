// vendors
import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';

// utils
import fancyDate from '../../../utils/fancy-date';

// styles
import Styles from './comment-list-item-styles';

export default class CommentListItem extends Component {

  static propTypes = {
    comment: PropTypes.object.isRequired,
    allowDelete: PropTypes.bool.isRequired
  };

  constructor (props) {
    super(props);
  }

  render () {
    const { comment, allowDelete } = this.props;

    return (
      <View style={ Styles.container }>
        <Image source={{ uri: comment.commenter.picture }} style={ Styles.picture } />
        <View style={ Styles.right }>
          <View style={ Styles.top }>
            <Text style={ Styles.commenter }>{ comment.commenter.username }</Text>
            <Text style={ Styles.subtext }>{ fancyDate(comment.createdAt) }</Text>
          </View>
          <Text style={ Styles.content }>{ comment.content }</Text>
          {
            allowDelete &&
            <TouchableOpacity onPress={ () => null }>
              <Text style={[ Styles.subtext, Styles.bold ]}>delete</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }

}