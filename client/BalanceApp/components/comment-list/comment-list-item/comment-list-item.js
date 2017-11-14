import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import fancyDate from '../../../utils/fancy-date';
import Styles from './comment-list-item-styles';

export default class CommentListItem extends Component {

  static propTypes = {
    comment: PropTypes.shape({
      commenter: PropTypes.shape({
        userId: PropTypes.string.isRequired,
        picture: PropTypes.string,
        username: PropTypes.string
      }),
      createdAt: PropTypes.instanceOf(Date),
      replyingToUser: PropTypes.shape({
        userId: PropTypes.string,
        username: PropTypes.string
      }),
      content: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired
    }).isRequired,
    loggedInUser: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUserSelect: PropTypes.func.isRequired,
    noteAuthor: PropTypes.string.isRequired,
    onReply: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.isNoteAuthor = props.noteAuthor === props.comment.commenter.userId;
    this.allowDelete = props.loggedInUser === props.comment.commenter.userId;
  }

  render () {
    const {
      onUserSelect,
      comment,
      onDelete
    } = this.props;

    const commenterStyles = [
      Styles.commenter,
      (this.isNoteAuthor && Styles.authorComment)
    ];

    const containerStyles = [
      Styles.container,
      comment._temp ? Styles.transparent : null
    ];

    return (
      <View style={ containerStyles }>
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
          <View style={ Styles.contentContainer }>
            {
              comment.replyingToUser &&
              (
                <TouchableOpacity
                  onPress={ () => onUserSelect(comment.replyingToUser.userId) }
                >
                  <Text style={ Styles.commenter }>
                    {`@${comment.replyingToUser.username} `}
                  </Text>
                </TouchableOpacity>
              )
            }
            <Text style={ Styles.contentText }>{ comment.content }</Text>
          </View>
          {
            this.allowDelete
            ? (
              <TouchableOpacity onPress={ () => onDelete(comment._id) }>
                <Text style={[ Styles.subtext, Styles.bold ]}>delete</Text>
              </TouchableOpacity>
              )
            : (<TouchableOpacity onPress={ () => this.props.onReply(comment.commenter) }>
                <Text style={[ Styles.subtext, Styles.bold ]}>reply</Text>
              </TouchableOpacity>
              )
          }
        </View>
      </View>
    );
  }

}
