import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import prettyDate from '../../../utils/fancy-date';

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
    // 'accepted_friend_request',
    // 'new_nudge',
    // 'nudged_project_updated',
    // 'new_reaction',
    // 'new_comment'
    switch (this.type) {

      case 'new_comment':
        const note = this.related.find(r => r.kind === 'note').item;
        return <NewComment user={ this.sender } note={ note._id } nav={ this.nav } />;

      case 'accepted_friend_request':
        return <AcceptedFriendRequest user={ this.sender } nav={ this.nav } />;

      case 'new_nudge':
        const project = this.related.find(r => r.kind === 'project').item;
        return <NewNudge user={ this.sender } project={ project } nav={ this.nav } />;
    }
  }

  render () {
    const { notification } = this.props;

    return (
      <View style={[ Styles.flexRow, Styles.notification ]}>
        <Image source={{ uri: this.sender.picture }} style={ Styles.avatar } />
        <View style={[ Styles.textContainer ]}>
          { this.getText() }
        </View>
        <View>
          <Text style={ Styles.date }>{ prettyDate(notification.createdAt) }</Text>
        </View>
      </View>
    );
  }

}

const NewComment = ({ user, note, nav }) => {
  return (
    <Text>
      <Text
        onPress={ () => nav('UserProfile', { userId: user.userId }) }
        style={ Styles.link }
      >
        { user.username }
      </Text>
      <Text style={ Styles.text }> commented on your </Text>
      <Text onPress={ () => nav('Note', { id: note }) } style={ Styles.link }>
        note
      </Text>
    </Text>
  );
};

const AcceptedFriendRequest = ({ user, nav }) => {
  return (
    <Text>
      <Text
        onPress={ () => nav('UserProfile', { userId: user.userId }) }
        style={ Styles.link }
      >
        { user.username }
      </Text>
      <Text style={ Styles.text }> and you are now friends.</Text>
    </Text>
  );
};

const NewNudge = ({ user, project, nav }) => {
  return (
    <Text>
      <Text
        onPress={ () => nav('UserProfile', { userId: user.userId }) }
        style={ Styles.link }
      >
        { user.username }
      </Text>
      <Text style={ Styles.text }> wants you to work on </Text>
      <Text
        onPress={ () => nav('Project', { project: project._id }) }
        style={ Styles.link }
      >
        { project.title }
      </Text>
    </Text>
  );
}

export default NotificationListItem;
