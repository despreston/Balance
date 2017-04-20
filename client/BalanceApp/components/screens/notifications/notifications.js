// vendors
import React, { Component, PropTypes } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

import FriendRequests from './friend-requests/friend-requests';

import Styles from './notifications-styles';

export default class Notifications extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    friendRequests: PropTypes.array.isRequired,
    nav: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props);
  }
  
  render () {
    const { friendRequests, nav } = this.props;
    return (
      <ScrollView style={ Styles.notifications }>
        <TouchableOpacity onPress={ () => nav('FriendRequests', { friendRequests }) }>
          <FriendRequests requests={ this.props.friendRequests } />
        </TouchableOpacity>
      </ScrollView>
    );
  }

};