// vendors
import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

// styles
import Styles from '../profile-info/profile-info-styles';

function UserProfileSwitch (props) {
  let { user, hideProjects = false, switchContext, selectedContext } = props;
  
  const friendCount = user.friends.reduce((count, friend) => {
    return friend.status === 'accepted' ? count + 1 : count;
  }, 0);

  function handlePlural (singular, count) {
    return `${count} ${singular}${(count > 1 || count === 0)  ? 's' : ''}`;
  }

  function getStyle (context) {
    return context === selectedContext
      ? [ Styles.contextOptionText, Styles.selectedContext ]
      : Styles.contextOptionText;
  }

  return (
      <View style={Styles.row}>
        <TouchableOpacity
          style={ Styles.contextOption }
          onPress={ () => switchContext('latest') }>
          <Text style={ getStyle('latest') }>Latest</Text>
        </TouchableOpacity>
        {
          !hideProjects && 
          <TouchableOpacity
            style={ Styles.contextOption }
            onPress={() => switchContext('projects')}>
            <Text style={ getStyle('projects') }>Projects</Text>
          </TouchableOpacity>
        }
        <TouchableOpacity
          style={ Styles.contextOption }
          onPress={ () => switchContext('friends') }>
          <Text style={ getStyle('friends') }>
            { handlePlural('Friend', friendCount) }
          </Text>
        </TouchableOpacity>
      </View>
  );

}

UserProfileSwitch.propTypes = {
  user: PropTypes.shape({
    friends: PropTypes.array.isRequired
  }).isRequired,
  hideProjects: PropTypes.bool,
  switchContext: PropTypes.func.isRequired,
  selectedContext: PropTypes.string.isRequired
};

export default UserProfileSwitch;