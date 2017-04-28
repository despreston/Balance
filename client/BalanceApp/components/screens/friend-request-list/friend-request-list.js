// vendors
import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

import UserList from '../../user-list/user-list';

import Styles from './friend-request-list-styles';

class FriendRequestList extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);
    this.users = this.props.navigation.state.params.friendRequests;
  }

  render () {
    const { navigation: { navigate: nav } } = this.props;

    return (
      <View style={ Styles.list }>
        <UserList
          users={ this.users }
          onUserSelect={ userId => nav('UserProfile', { userId }) }
        />
      </View>
    );
  }

}

export default FriendRequestList;