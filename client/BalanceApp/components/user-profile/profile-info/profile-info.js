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

function ProfileInfo ({ user, customTextStyle = [] }) {

  return (
    <View style={ Styles.ProfileInfo }>
      <View style={ Styles.row }>
        <Image style={ Styles.image } source={{ uri: user.picture }} />
        <View style={ Styles.info }>
          <Text
            adjustsFontSizeToFit
            minimumFontScale={ 0.8 }
            style={ [Styles.name, ...customTextStyle] }
          >
            { user.name }
          </Text>
          <Text
              style={ [Styles.username, ...customTextStyle] }
            >
              @{ user.username }
            </Text>
        </View>
      </View>
      {
        user.bio &&
        <Text style={ [Styles.bio, ...customTextStyle] }>
          { user.bio }
        </Text>
      }
      <View style={ Styles.friendButton }>
        <FriendButton userId={ user.userId } hideIfLoggedInUser={ true } />
      </View>
    </View>
  );

}

ProfileInfo.propTypes = {
  user: PropTypes.object.isRequired
};

export default ProfileInfo;