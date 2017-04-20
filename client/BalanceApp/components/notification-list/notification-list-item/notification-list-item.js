import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import Styles from './notification-list-item-styles';

class NotificationListItem extends Component {

  static propTypes = {
    notification: PropTypes.object.isRequired,
    nav: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);

    this.related = props.notification.related;
    this.sender = this.related.find(n => n.kind === 'user').item;
    this.nav = props.nav;
    this.type = props.notification.type;
  }

  getText () {
    // 'new_friend_request',
    // 'accepted_friend_request',
    // 'new_nudge',
    // 'nudged_project_updated',
    // 'new_reaction',
    // 'new_comment'
    switch (this.type) {

      case 'new_comment':
        const note = this.related.find(r => r.kind === 'note').item;
        return <NewComment user={ this.sender } note={ note._id } nav={ this.props.nav } />;
    }
  }

  render () {
    const { notification } = this.props;

    return (
      <View style={[ Styles.flexRow, Styles.notification ]}>
        <Image source={{ uri: this.sender.picture }} style={ Styles.avatar } />
        <View style={[ Styles.flexRow, Styles.textContainer ]}>
          { this.getText() }
        </View>
      </View>
    );
  }

}

const NewComment = ({ user, note, nav }) => {
  return (
    <View style={ Styles.flexRow }>
      <TouchableOpacity onPress={ () => nav('UserProfile', { userId: user.userId }) }>
        <Text style={ Styles.link }>{ user.username }</Text>
      </TouchableOpacity>
      <Text style={ Styles.text }> commented on your </Text>
      <TouchableOpacity onPress={ () => nav('Note', { id: note }) }>
        <Text style={ Styles.link }>note</Text>
      </TouchableOpacity>
    </View>
  );
}

export default NotificationListItem;
