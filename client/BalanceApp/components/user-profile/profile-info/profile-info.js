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

function ProfileInfo ({ user, hideProjects = false, switchContext }) {

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
      <View style={Styles.row}>
        <TouchableOpacity
          style={Styles.contextOption}
          onPress={() => switchContext('latest')}>
          <Text style={Styles.contextOptionText}>Latest</Text>
        </TouchableOpacity>
        {
          !hideProjects && 
          <TouchableOpacity
            style={Styles.contextOption}
            onPress={() => switchContext('projects')}>
            <Text style={Styles.contextOptionText}>
              { handlePlural('Project', user.project_count) }
            </Text>
          </TouchableOpacity>
        }
        <TouchableOpacity
          style={Styles.contextOption}
          onPress={() => switchContext('friends')}>
          <Text style={Styles.contextOptionText}>
            { handlePlural('Friend', user.friends.length) }
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

}

ProfileInfo.propTypes = {
  user: PropTypes.object.isRequired,
  hideProjects: PropTypes.bool,
  switchContext: PropTypes.func.isRequired
};

export default ProfileInfo;