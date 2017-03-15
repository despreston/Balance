import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

function mapStateToProps (state, ownProps) {
  let fullLoggedInUser = state.users[state.loggedInUser];

  let fromFriendList = fullLoggedInUser.friends.find(friend => {
    return friend.userId === ownProps.userId;
  });

  return {
    status: fromFriendList ? fromFriendList.status : 'none',
    loggedInUser: state.loggedInUser
  };
}

class FriendButton extends Component {

  static propTypes = {
    userId: PropTypes.string.isRequired,
    loggedInUser: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  };

  constructor (props) {
    super(props);
  }

  friendActionText () {
    const { status, userId, loggedInUser } = this.props;

    if (userId === loggedInUser) {
      return 'You!';
    }

    switch (status) {
      case 'accepted':
        return 'Remove';
      case 'requested':
        return 'Accept';
      case 'pending':
        return 'Cancel Request';
      default:
        return 'Add';
    }
  }

  render () {
    return (
      <TouchableOpacity onPress={ () => null } >
        <Text>{ this.friendActionText() }</Text>
      </TouchableOpacity>
    );
  }

}

export default connect(mapStateToProps)(FriendButton);