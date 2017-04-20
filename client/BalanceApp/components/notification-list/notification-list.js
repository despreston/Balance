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
    return (
      <View>
        {
          this.props.notifications.map((n, i) => (
            <TouchableOpacity key={ i } onPress={ () => null }>
              <NotificationListItem nav={ this.props.nav } notification={ n } />
            </TouchableOpacity>
          ))
        }
      </View>
    );
  }

}

export default NotificationList;
