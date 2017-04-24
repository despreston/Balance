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
    return `${count} ${singular}${(count > 1 || count === 0)  ? 'S' : ''}`;
  }

  function isSelected (context) {
    return context === selectedContext;
  }

  function renderOption (value, label) {
    return (
      <TouchableOpacity
          style={ Styles.contextOption }
          onPress={ () => switchContext(value) }>
        <View style={ isSelected(value) && Styles.border }>
          <Text style={ [
            Styles.contextOptionText,
            Styles.purpleText,
            isSelected(value) && Styles.selectedContext
            ] }>
            { label }
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={Styles.row}>
      { renderOption('latest', 'LATEST') }
      { 
        !hideProjects &&
        renderOption('projects', handlePlural('PROJECT', user.project_count || 0))
      }
      { renderOption('friends', handlePlural('FRIEND', friendCount)) }
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