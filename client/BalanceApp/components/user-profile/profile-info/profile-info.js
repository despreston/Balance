// vendors
import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';

// components
import FriendButton from '../../friend-button/friend-button';

// styles
import Styles from './profile-info-styles';

function ProfileInfo ({ user }) {

  return (
    <View style={ Styles.ProfileInfo }>
      <View style={ Styles.row }>
        <Image
          style={ Styles.image }
          source={{ uri: user.picture }}
        />
        <View style={ Styles.info }>
          <Text adjustsFontSizeToFit={ true } style={ Styles.name }>
            { user.name }
          </Text>
          <Text adjustsFontSizeToFit={ true } style={ Styles.username }>
            @{ user.username }
          </Text>
          <View style={ Styles.friendButton }>
            <FriendButton
              userId={ user.userId }
              hideIfLoggedInUser={ true } />
          </View>
        </View>
      </View>
    </View>
  );

}

ProfileInfo.propTypes = {
  user: PropTypes.object.isRequired
};

export default ProfileInfo;