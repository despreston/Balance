import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, View } from 'react-native';

import NotificationListItem from './notification-list-item/notification-list-item';

class NotificationList extends Component {

  static propTypes = {
    notifications: PropTypes.array.isRequired,
    nav: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
  }

  render () {
    this.props.notifications.sort((a,b) => b.createdAt - a.createdAt);

    return (
      <View>
        {
          this.props.notifications.map((n, i) => (
            <NotificationListItem key={ i } nav={ this.props.nav } notification={ n } />
          ))
        }
      </View>
    );
  }

}

export default NotificationList;
