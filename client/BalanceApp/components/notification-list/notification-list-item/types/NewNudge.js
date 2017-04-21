import React from 'react';
import { Text, Image } from 'react-native';
import Styles from '../notification-list-item-styles';

const NewNudge = ({ user, project, nav }) => {
  return (
    <Text>
      <Text
        onPress={ () => nav('UserProfile', { userId: user.userId }) }
        style={ Styles.link }
      >
        { user.username }
      </Text>
      <Text style={ Styles.text }> wants you to work on </Text>
      <Text
        onPress={ () => nav('Project', { project: project._id }) }
        style={ Styles.link }
      >
        { project.title }
      </Text>
    </Text>
  );
};

export default NewNudge;
