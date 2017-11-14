import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, Image }           from 'react-native';
import Styles                          from './user-list-item-styles';
import FriendButton                    from '../../friend-button/friend-button';

export default class UserListItem extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  };

  renderUsername () {
    const { user } = this.props;

    if (!user.username) {
      return null;
    }

    return <Text style={ Styles.text } >{user.username}</Text>;
  }

  renderName () {
    const { user } = this.props;

    if (!user.name) {
      return null;
    }

    const styles = [ Styles.text, (user.username && Styles.small) ];

    return <Text style={ styles } >{ user.name }</Text>;
  }

  render () {
    const { user } = this.props;

    return (
      <View style={ Styles.userListItem }>
        <Image source={{ uri: user.picture }} style={ Styles.picture } />
        <View style={ Styles.right }>
          { this.renderUsername() }
          { this.renderName() }
        </View>
        <FriendButton userId={ user.userId } />
      </View>
    );
  }

}
