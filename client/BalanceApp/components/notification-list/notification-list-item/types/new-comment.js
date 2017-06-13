import React from 'react';
import { Text } from 'react-native';
import Styles from '../notification-list-item-styles';

const NewComment = ({ user, comment, nav }) => {
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
      <Text style={ Styles.text }> commented on your </Text>
      <Text onPress={ () => nav('Note', { id: comment.note }) } style={ Styles.link }>
        note
      </Text>
      <Text style={ Styles.text }>{`: "${short}"`}</Text>
    </Text>
  );
};

NewComment.icon = require('../../../../assets/icons/comment-filled.png');

export default NewComment;