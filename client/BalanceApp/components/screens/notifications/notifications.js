// vendors
import React, { Component, PropTypes } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

import FriendRequests from './friend-requests/friend-requests';
import Refresh from '../../refresh/refresh';
import NotificationList from '../../notification-list/notification-list';

import Styles from './notifications-styles';

export default class Notifications extends Component {

  static propTypes = {
    friendRequests: PropTypes.array.isRequired,
    nav: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    refreshing: PropTypes.bool.isRequired,
    notifications: PropTypes.array.isRequired
  }

  constructor (props) {
    super(props);
  }
  
  render () {
    const { friendRequests, nav, onRefresh, refreshing, notifications } = this.props;

    return (
      <ScrollView 
        style={ Styles.notifications }
        refreshControl={ <Refresh onRefresh={ onRefresh } refreshing={ refreshing } /> }
      >
        <TouchableOpacity onPress={ () => nav('FriendRequests', { friendRequests }) }>
          <FriendRequests requests={ friendRequests } />
        </TouchableOpacity>
        <NotificationList nav={ this.props.nav } notifications={ notifications } />
      </ScrollView>
    );
  }

};