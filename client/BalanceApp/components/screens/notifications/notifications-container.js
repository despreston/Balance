// vendors
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { api } from '../../../utils/api';
import actions from '../../../actions/';

import Notifications from './notifications';

class NotificationsContainer extends Component {

  static mapStateToProps (state) {
    return {
      user: state.users[state.loggedInUser],
      notifications: Object.keys(state.notifications).map(id => state.notifications[id])
    };
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    notifications: PropTypes.array.isRequired
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
    this.refresh = this.refresh.bind(this);

    this.fetchAll();
  }

  fetchAll () {
    return this.props.dispatch(actions.markAsRead())
    .then(() => this.props.dispatch(actions.fetchNotifications()))
    .then(() => this.fetchFriendRequests())
    .then(friend_requests => this.setState({ friend_requests }));
  }

  fetchFriendRequests () {
    return api(`users/${this.props.user.userId}/friends/requests`);
  }

  refresh () {
    this.setState({ refreshing: true });

    this.fetchAll()
    .then(() => this.setState({ refreshing: false }));
  }
  
  render () {
    return (
      <Notifications
        notifications={ this.props.notifications }
        refreshing={ this.state.refreshing }
        onRefresh={ () => this.refresh() }
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