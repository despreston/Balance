// vendors
import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image
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
          <Text adjustsFontSizeToFit={true} style={Styles.name}>{user.name}</Text>
          <Text adjustsFontSizeToFit={true} style={Styles.displayName}>@fake-user-name</Text>
        </View>
      </View>
      <View style={Styles.row}>
        <Text style={Styles.stats}>
          { handlePlural('Project', user.project_count) }
        </Text>
        <Text style={Styles.stats}>
          { handlePlural('Friend', user.friends.length) }
        </Text>
      </View>
    </View>
  );

}

ProfileInfo.propTypes = {
  user: PropTypes.object.isRequired
};

export default ProfileInfo;