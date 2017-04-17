// vendors
import React, { Component, PropTypes } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

// components
import UserListItem from './user-list-item/user-list-item';

export default class UserList extends Component {

  static propTypes = {
    users: PropTypes.array.isRequired,
    onUserSelect: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  renderUsers () {
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