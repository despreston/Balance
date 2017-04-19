// vendors
import React, { Component, PropTypes } from 'react';
import { ScrollView, Text } from 'react-native';

import FriendRequests from './friend-requests/friend-requests';

import Styles from './notifications-styles';

export default class Notifications extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    friendRequests: PropTypes.array.isRequired
  }

  constructor (props) {
    super(props);
  }
  
  render () {
    return (
      <ScrollView style={ Styles.notifications }>
        <FriendRequests requests={ this.props.friendRequests } />
      </ScrollView>
    );
  }

};