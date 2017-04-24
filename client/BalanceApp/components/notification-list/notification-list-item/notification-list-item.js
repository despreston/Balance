import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import prettyDate from '../../../utils/fancy-date';

import Styles from './notification-list-item-styles';

import NewComment            from './types/NewComment';
import NewReaction           from './types/NewReaction';
import AcceptedFriendRequest from './types/AcceptedFriendRequest';
import NewNudge              from './types/NewNudge';
import NudgedProjectUpdated  from './types/NudgedProjectUpdated';

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
    let props = { nav: this.nav, user: this.sender };
    let icon;

    switch (this.type) {
      case 'new_comment':
        props.note = this.related.find(r => r.kind === 'note').item._id;
        return { text: (<NewComment { ...props } />), icon: NewComment.icon };

      case 'accepted_friend_request':
        return { text: (<AcceptedFriendRequest { ...props } />), icon: AcceptedFriendRequest.icon };

      case 'new_nudge':
        props.project = this.related.find(r => r.kind === 'project').item;
        return { text: (<NewNudge { ...props } />), icon: NewNudge.icon };

      case 'nudged_project_updated':
        props.project = this.related.find(r => r.kind === 'project').item;
        return { text: (<NudgedProjectUpdated { ...props } />), icon: NudgedProjectUpdated.icon };

      case 'new_reaction':
        props.note = this.related.find(r => r.kind === 'note').item._id;
        props.reaction = this.related.find(r => r.kind === 'reaction').item.reaction;
        return { text: (<NewReaction { ...props }/>), icon: NewReaction.icon };
    }
  }

  render () {
    const { notification } = this.props;

    const { text, icon } = this.getText();

    return (
      <View style={[ Styles.flexRow, Styles.notification ]}>
        <View>
          <Image source={{ uri: this.sender.picture }} style={ Styles.avatar } />
          <View style={ Styles.iconOverlay }>
            <Image source={ icon } style={ Styles.icon } />
          </View>
        </View>
        <View style={[ Styles.textContainer ]}>
          { text }
        </View>
        <View>
          <Text style={ Styles.date }>{ prettyDate(notification.createdAt) }</Text>
        </View>
      </View>
    );
  }

}

export default NotificationListItem;
