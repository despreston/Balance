// vendors
import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

function UserListItem ({ user }) {

  return <Text>{user.name}</Text>

}

UserListItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserListItem;