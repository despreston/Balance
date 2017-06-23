import React from 'react';
import { Text } from 'react-native';
import Styles from '../notification-list-item-styles';

const NewCommentReply = ({ user, comment, nav }) => {
  let short = comment.content.slice(0, 60);

  if (comment.content.length > 60) {
    short += '...';
  }

  return (
    <Text>
      <Text
        onPress={ () => nav('UserProfile', { userId: user.userId }) }
        style={ Styles.link }
      >
        { user.username }
      </Text>
      <Text style={ Styles.text }> replied to your </Text>
      <Text onPress={ () => nav('Note', { id: comment.note }) } style={ Styles.link }>
        comment
      </Text>
      <Text style={ Styles.text }>{`: "${short}"`}</Text>
    </Text>
  );
};

NewCommentReply.icon = require('../../../../assets/icons/comment-filled.png');

export default NewCommentReply;