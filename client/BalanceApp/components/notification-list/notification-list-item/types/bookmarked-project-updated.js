import React from 'react';
import { Text } from 'react-native';
import Styles from '../notification-list-item-styles';

const BookmarkedProjectUpdated = ({ user, project, nav }) => {
  return (
    <Text>
      <Text
        onPress={ () => nav('UserProfile', { userId: user.userId }) }
        style={ Styles.link }
      >
        { user.username }
      </Text>
      <Text style={ Styles.text }> updated </Text>
      <Text
        onPress={ () => nav('Project', { project: project._id }) }
        style={ Styles.link }
      >
        { project.title }
      </Text>
    </Text>
  );
};

BookmarkedProjectUpdated.icon = require('../../../../assets/icons/star-filled.png');

export default BookmarkedProjectUpdated;