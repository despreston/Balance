import React from 'react';
import { Text } from 'react-native';
import Styles from '../notification-list-item-styles';

const NewReaction = ({ user, note, nav, reaction }) => {
  return (
    <Text>
      <Text
        onPress={ () => nav('UserProfile', { userId: user.userId }) }
        style={ Styles.link }
      >
        { user.username }
      </Text>
      <Text style={ Styles.text }> reacted to your </Text>
      <Text onPress={ () => nav('Note', { id: note }) } style={ Styles.link }>
        note { reaction }
      </Text>
    </Text>
  );
};

export default NewReaction;
