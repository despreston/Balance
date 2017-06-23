import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';

import prettyDate from '../../../utils/fancy-date';

import Styles from './notification-list-item-styles';

import NewComment               from './types/new-comment';
import NewReaction              from './types/new-reaction';
import AcceptedFriendRequest    from './types/accepted-friend-request';
import NewNudge                 from './types/new-nudge';
import NudgedProjectUpdated     from './types/nudged-project-updated';
import BookmarkedProjectUpdated from './types/bookmarked-project-updated';

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
  }

  getNotificationForType (type) {
    function getPropsForNotification () {
      return {
        ...notificationProps,
        ...notifications[type].props
      };
    }

    const notifications = {
      accepted_friend_request: {
        get props () { return {}; },
        get text () {
          return <AcceptedFriendRequest { ...getPropsForNotification() } />;
        },
        icon: AcceptedFriendRequest.icon
      },

      new_comment: {
        get props () {
          return {
            comment: related.find(r => r.kind === 'comment').item
          };
        },
        get text () { 
          return <NewComment { ...getPropsForNotification() } />;
        },
        icon: NewComment.icon
      },

      new_nudge: {
        get props () {
          return {
            project: related.find(r => r.kind === 'project').item
          };
        },
        get text () {
          return <NewNudge { ...getPropsForNotification() } />;
        },
        icon: NewNudge.icon
      },

      nudged_project_updated: {
        get props () {
          return {
            project: related.find(r => r.kind === 'project').item
          };
        },
        get text () {
          return <NudgedProjectUpdated { ...getPropsForNotification() } />;
        },
        icon: NudgedProjectUpdated.icon
      },

      new_reaction: {
        get props () {
          return {
            note: related.find(r => r.kind === 'note').item._id,
            reaction: related.find(r => r.kind === 'reaction').item.reaction
          };
        },
        get text () {
          return <NewReaction { ...getPropsForNotification() } />;
        },
        icon: NewReaction.icon
      },

      bookmarked_project_updated: {
        get props () {
          return {
            project: related.find(r => r.kind === 'project').item
          };
        },
        get text () {
          return <BookmarkedProjectUpdated { ...getPropsForNotification() } />;
        },
        icon: BookmarkedProjectUpdated.icon
      }
    };

    if (!notifications[type]) return null;

    let notificationProps = { nav: this.nav, user: this.sender };
    let related = this.related;

    return {
      text: notifications[type].text,
      icon: notifications[type].icon
    };
  }

  render () {
    const { notification } = this.props;
    
    if (!this.getNotificationForType(notification.type)) return null;

    const { text, icon } = this.getNotificationForType(notification.type);

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
