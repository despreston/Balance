// vendors
import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';

// styles
import { Styles } from './profile-info-styles';

function ProfileInfo ({ user }) {

  return (
    <View style={Styles.ProfileInfo}>
      <Image
        style={Styles.image}
        source={{ uri: user.picture }}
      />
      <View style={Styles.info}>
        <Text adjustsFontSizeToFit={true} style={Styles.name}>{user.name}</Text>
        <Text adjustsFontSizeToFit={true} style={Styles.displayName}>@fake-user-name</Text>
      </View>
    </View>
  );

}

ProfileInfo.propTypes = {
  user: PropTypes.object.isRequired
};

export default ProfileInfo;