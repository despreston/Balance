// vendors
import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Styles from './user-list-item-styles';

function mapStateToProps (state, ownProps) {
  let fullLoggedInUser = state.users[state.loggedInUser];

  let fromFriendList = fullLoggedInUser.friends.find(friend => {
    return friend.userId === ownProps.user.userId;
  });

  return {
    loggedInUser: state.loggedInUser,
    friendStatus: fromFriendList && fromFriendList.status,
    isFriend: fromFriendList ? true : false
  }
}

class UserListItem extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    isFriend: PropTypes.bool.isRequired,
    friendStatus: PropTypes.string,
    loggedInUser: PropTypes.string.isRequired
  };

  constructor (props) {
    super(props);
  }

  friendActionText () {
    const { friendStatus, user, loggedInUser, isFriend } = this.props;

    if (user.userId === loggedInUser) {
      return 'You!';
    }

    if (isFriend) {
      switch (friendStatus) {
        case 'requested':
          return 'Accept';
        case 'pending':
          return 'Cancel';
        default:
          return 'Remove';
      }
    }
    
    return 'Add';
  }

  render () {
    const { user, loggedInUser, isFriend } = this.props;
    return (
      <View style={Styles.userListItem} >
        <Image source={{ uri: user.picture }} style={Styles.picture} />
        <View style={Styles.right} >
          <Text style={Styles.text} >{user.name}</Text>
          <Text style={[ Styles.text, Styles.username ]} >
            @{user.username}
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={Styles.lighter}>{ this.friendActionText() }</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

export default connect(mapStateToProps)(UserListItem);