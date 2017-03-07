// vendors
import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';

import Styles from './user-list-item-styles';

function UserListItem ({ user }) {
  return (
    <View>
      <Image source={{ uri: user.picture }} style={Styles.picture} />
      <View>
        <Text>{user.name}</Text>
      </View>
    </View>
  );

}

UserListItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserListItem;