// vendors
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

// components
import UserListItem from './user-list-item/user-list-item';

export default class UserList extends Component {

  static propTypes = {
    users: PropTypes.array.isRequired,
    onUserSelect: PropTypes.func.isRequired,
    emptyState: PropTypes.object
  };

  constructor (props) {
    super(props);
  }

  renderUsers () {
    if (this.props.users.length < 1) {
      return this.props.emptyState;
    }
    
    return this.props.users.map(user => {
      return (
        <TouchableOpacity
          key={user.userId}
          onPress={ () => this.props.onUserSelect(user.userId) }>
          <UserListItem user={user} />
        </TouchableOpacity>
      );
    });
  }

  render () {
    return (
      <ScrollView keyboardShouldPersistTaps='handled'>
        { this.renderUsers() }
      </ScrollView>
    );
  }

}