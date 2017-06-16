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
    allowDelete: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUserSelect: PropTypes.func.isRequired,
    isNoteAuthor: PropTypes.bool
  };

  constructor (props) {
    super(props);
  }

  render () {
    const { onUserSelect, comment, isNoteAuthor, allowDelete, onDelete } = this.props;

    const commenterStyles = [
      Styles.commenter,
      (isNoteAuthor && Styles.authorComment)
    ];

    return (
      <View style={ Styles.container }>
        <Image source={{ uri: comment.commenter.picture }} style={ Styles.picture } />
        <View style={ Styles.right }>
          <View style={ Styles.top }>
            <TouchableOpacity
              onPress={ () => onUserSelect(comment.commenter.userId) }
            >
              <Text style={ commenterStyles }>
                { comment.commenter.username }
              </Text>
            </TouchableOpacity>
            <Text style={ Styles.subtext }>{ fancyDate(comment.createdAt) }</Text>
          </View>
          <Text style={ Styles.content }>{ comment.content }</Text>
          {
            allowDelete &&
            <TouchableOpacity onPress={ () => onDelete(comment._id) }>
              <Text style={[ Styles.subtext, Styles.bold ]}>delete</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }

}