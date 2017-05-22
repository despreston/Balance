import React, { Component } from 'react';
import { TouchableOpacity, Image, Animated } from 'react-native';
import { connect } from 'react-redux';
import Styles from './toaster-styles';
import NotificationListItem from '../notification-list/notification-list-item/notification-list-item';
import actions from '../../actions';

class Toaster extends Component {

  static mapStateToProps (state) {
    let notification = null;

    if (state.notificationForToaster) {
      notification = state.notifications[state.notificationForToaster];
    }

    return { notification };
  }

  constructor (props) {
    super(props);
    this.startYPos = 150;
    this.state = { y: new Animated.Value(this.startYPos), visible: false };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.notification) {
      // show the toaster
      Animated.spring(this.state.y, {
        toValue: 0,
        tension: 30
      }).start();

      // hide the toaster after 5 seconds
      setTimeout(() => {
        this.hide();
      }, 5000);
    }
  }

  hide () {
    Animated.spring(this.state.y, {
      toValue: this.startYPos,
      tension: 30
    }).start(() => this.props.dispatch(actions.showNotificationToaster(null)));
  }

  nav (routeName, params) {
    this.props.nav()({ type: 'Navigation/NAVIGATE', routeName, params });
  }
  
  render () {
    if (!this.props.notification) return null;

    return (
      <Animated.View style={[ { transform: [{ translateY: this.state.y }] }, Styles.toaster ]}>
        <NotificationListItem notification={this.props.notification} nav={ this.nav.bind(this) }/>
        <TouchableOpacity style={ Styles.close } onPress={ () => this.hide() }>
          <Image
            style={ Styles.closeBtn }
            source={ require('../../assets/icons/remove.png') }
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }

}

export default connect(Toaster.mapStateToProps)(Toaster);