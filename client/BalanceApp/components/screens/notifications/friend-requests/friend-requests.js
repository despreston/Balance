// vendors
import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import Styles from './friend-requests-styles';

import AvatarCollection from '../../../avatar-collection/avatar-collection';

export default class FriendRequests extends Component {

  static propTypes = {
    requests: PropTypes.array.isRequired
  }

  constructor (props) {
    super(props);
  }
  
  render () {
    const { requests } = this.props;

    return (
      <View style={[ Styles.flexRow, Styles.friendRequests ]}>
        <View style={ Styles.flexRow }>
          <AvatarCollection
            imageSize={ 34 }
            images={ requests.map(r => r.picture) }
          />
          <Text style={ Styles.text }>Friend requests</Text>
        </View>
        <View>
          <Text style={ Styles.text }>{ requests.length }</Text>
        </View>
      </View>
    );
  }

};