import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import Styles from './unread-notifications-styles';

class UnreadNotifications extends Component {
  
  static mapStateToProps (state) {

    const count = Object.keys(state.notifications)
      .map(id => state.notifications[id])
      .reduce((acc, notification) => {
        return !notification.readAt ? acc + 1 : acc;
      }, 0);

    return { count };
  }

  constructor (props) {
    super(props);
  }

  render () {
    if (this.props.count === 0) { return null; }
    
    let text = this.props.count > 9 ?  '9+' : String(this.props.count);

    return (
      <View style={ Styles.container }>
        <Text style={ Styles.count }>{ text }</Text>
      </View>
    );
  }

}

export default connect(UnreadNotifications.mapStateToProps)(UnreadNotifications);