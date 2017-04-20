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

    this.state = { friend_requests: [] };

    this.fetchFriendRequests(props.user.userId);
  }

  fetchFriendRequests (userId) {
    api(`users/${userId}/friends/requests`)
    .then(users => this.setState({ friend_requests: users }));
  }
  
  render () {
    return (
      <Notifications
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