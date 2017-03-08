// vendors
import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Styles from './user-list-item-styles';

function mapStateToProps (state, ownProps) {
  let fullLoggedInUser = state.users[state.loggedInUser];
  let isFriend;

  if (fullLoggedInUser.friends.indexOf(ownProps.user.userId) < 0) {
    isFriend = false;
  } else {
    isFriend = true;
  }

  return {
    loggedInUser: state.loggedInUser,
    isFriend
  }
}

class UserListItem extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    isFriend: PropTypes.bool.isRequired,
    loggedInUser: PropTypes.string.isRequired
  };

  constructor (props) {
    super(props);
  }

  friendActionText () {
    const { user, loggedInUser, isFriend } = this.props;

    if (user.userId === loggedInUser) {
      return 'You!';
    }
    if (isFriend) {
      return 'Remove';
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
          <Text style={[ Styles.text, Styles.displayName ]} >
            @fake-display-name
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