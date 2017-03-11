// vendors
import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

// styles
import Styles from './profile-info-styles';

function ProfileInfo ({ user }) {

  function handlePlural (singular, count) {
    return `${count} ${singular}${(count > 1 || count === 0)  ? 's' : ''}`;
  }

  return (
    <View style={Styles.ProfileInfo}>
      <View style={Styles.row}>
        <Image
          style={Styles.image}
          source={{ uri: user.picture }}
        />
        <View style={Styles.info}>
          <Text adjustsFontSizeToFit={true} style={Styles.name}>
            {user.name}
          </Text>
          <Text adjustsFontSizeToFit={true} style={Styles.username}>
            @{user.username}
          </Text>
        </View>
      </View>
    </View>
  );

}

ProfileInfo.propTypes = {
  user: PropTypes.object.isRequired
};

export default ProfileInfo;