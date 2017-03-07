// vendors
import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import Styles from './user-list-item-styles';

function UserListItem ({ user, isFriend }) {
  return (
    <View style={Styles.userListItem} >
      <Image source={{ uri: user.picture }} style={Styles.picture} />
      <View style={Styles.right} >
        <Text style={Styles.text} >{user.name}</Text>
        <Text style={[ Styles.text, Styles.displayName ]} >
          @fake-display-name
        </Text>
      </View>
      <TouchableOpacity>
        <Text style={Styles.lighter}>{ isFriend ? 'Remove' : 'Add' }</Text>
      </TouchableOpacity>
    </View>
  );

}

UserListItem.propTypes = {
  user: PropTypes.object.isRequired,
  isFriend: PropTypes.bool
};

export default UserListItem;