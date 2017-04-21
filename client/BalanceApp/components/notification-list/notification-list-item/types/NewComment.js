import React from 'react';
import { Text } from 'react-native';
import Styles from '../notification-list-item-styles';

const NewComment = ({ user, note, nav }) => {
  return (
    <Text>
      <Text
        onPress={ () => nav('UserProfile', { userId: user.userId }) }
        style={ Styles.link }
      >
        { user.username }
      </Text>
      <Text style={ Styles.text }> commented on your </Text>
      <Text onPress={ () => nav('Note', { id: note }) } style={ Styles.link }>
        note
      </Text>
    </Text>
  );
};

export default NewComment;