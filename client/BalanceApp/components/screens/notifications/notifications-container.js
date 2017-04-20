// vendors
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { api } from '../../../utils/api';

import Notifications from './notifications';

class NotificationsContainer extends Component {

  static mapStateToProps (state) {
    return { user: state.users[state.loggedInUser] };
  }

  static propTypes = {
    user: PropTypes.object.isRequired
  }

  static navigationOptions = {
    header: ({ goBack, state }, defaultHeader) => {
      return { ...defaultHeader, title: 'Notifications' };
    }
  }

  constructor (props) {
    super(props);

    this.state = { friend_requests: [], refreshing: false };

    this.fetchAll = this.fetchAll.bind(this);

    this.fetchAll();
  }

  fetchAll () {
    Promise.all([
      this.fetchFriendRequests(this.props.user.userId),
      this.fetchNotifications()
    ]).then(([ friend_requests, notifications ]) => {
      this.setState({ friend_requests, notifications });
    })
  }

  fetchNotifications () {
    return api(`notifications`);
  }

  fetchFriendRequests (userId) {
    return api(`users/${userId}/friends/requests`);
  }
  
  render () {
    return (
      <Notifications
        refreshing={ this.state.refreshing }
        onRefresh={ () => this.fetchAll() }
        nav={ this.props.navigation.navigate }
        friendRequests={ this.state.friend_requests }
        user={ this.props.user }
      />
    );
  }

};

export default connect(
  NotificationsContainer.mapStateToProps
)(NotificationsContainer);