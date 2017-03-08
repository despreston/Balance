// vendors
import React, { Component, PropTypes } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// components
import UserListItem from './user-list-item/user-list-item';

function mapStateToProps (state, ownProps) {

  let loggedInUser = state.users[state.loggedInUser];

  // augment each user in `ownProps.users` with `isFriend` flag
  // true if the user is a friend of the logged in user
  users = ownProps.users.map(user => {
    if (loggedInUser.friends.indexOf(user.userId) < 0) {
      user.isFriend = false;
    } else {
      user.isFriend = true;
    }
    return user;
  });

  return { users };
}

class UserList extends Component {

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
          <UserListItem
            user={user}
            isFriend={user.isFriend} />
        </TouchableOpacity>
      );
    });
  }

  render () {
    return (
      <ScrollView>
        { this.renderUsers() }
      </ScrollView>
    );
  }

}

export default connect(mapStateToProps)(UserList);
