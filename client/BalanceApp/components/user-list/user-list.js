// vendors
import React, { Component, PropTypes } from 'react';
import { ScrollView, View, Text } from 'react-native';

// components
import UserListItem from './user-list-item/user-list-item';

function UserList ({ users, onEdit = null, showContext = false }) {

  function renderUsers () {
    return users.map(user => {
      return (
        <View key={user.userId}>
          <UserListItem user={user} />
        </View>
      );
    });
  }

  return (
    <ScrollView>
      { renderUsers() }
    </ScrollView>
  );

}

UserList.propTypes = {
  users: PropTypes.array.isRequired
};

export default UserList;
