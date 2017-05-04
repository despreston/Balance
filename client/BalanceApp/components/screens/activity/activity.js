import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import GlobalActivity from './global-activity/global-activity';
import FriendsActivity from './friends-activity/friends-activity';
import Styles from './activity-styles';

class Activity extends Component {

  static propTypes = {
    screen: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
  }
  
  render () {
    return (
      <View style={ Styles.activity }>
        {
          this.props.screen === 'Global'
            ? <GlobalActivity onSelect={ this.props.onSelect }/>
            : <FriendsActivity onSelect={ this.props.onSelect }/>
        }
      </View>
    );
  }

}

export default Activity;
