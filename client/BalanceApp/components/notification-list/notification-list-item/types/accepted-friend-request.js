import React from 'react';
import { Text } from 'react-native';
import Styles from '../notification-list-item-styles';

const AcceptedFriendRequest = ({ user, nav }) => {
  return (
    <Text>
      <Text
        onPress={ () => nav('UserProfile', { userId: user.userId }) }
        style={ Styles.link }
      >
        { user.username }
      </Text>
      <Text style={ Styles.text }> and you are now friends</Text>
    </Text>
  );
};

AcceptedFriendRequest.icon = require('../../../../assets/icons/friends-filled.png');

export default AcceptedFriendRequest;
