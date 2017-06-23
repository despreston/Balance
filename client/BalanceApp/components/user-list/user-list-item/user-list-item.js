// vendors
import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';

// styles
import Styles from './user-list-item-styles';

// components
import FriendButton from '../../friend-button/friend-button';

export default class UserListItem extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
  }

  renderUsername () {
    const { user } = this.props;
    if (!user.username) {
      return null;
    }

    return (
      <Text style={[ Styles.text, Styles.username ]} >
        @{user.username}
      </Text>
    );
  }

  render () {
    const { user } = this.props;
    return (
      <View style={Styles.userListItem} >
        <Image source={{ uri: user.picture }} style={Styles.picture} />
        <View style={Styles.right} >
          <Text style={Styles.text} >{user.name}</Text>
          { this.renderUsername() }
        </View>
        <FriendButton userId={ user.userId } />
      </View>
    );
  }

}