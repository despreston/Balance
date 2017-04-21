// vendors
import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';

import Styles from './friend-requests-styles';

import AvatarCollection from '../../../avatar-collection/avatar-collection';

export default class FriendRequests extends Component {

  static propTypes = {
    requests: PropTypes.array.isRequired
  }
  
  render () {
    const { requests } = this.props;
    const text = `${requests.length} friend request${(requests.length === 0 || requests.length > 1) ? 's' : ''}`;

    return (
      <View style={[ Styles.flexRow, Styles.friendRequests ]}>
        <View style={ Styles.flexRow }>
          <AvatarCollection
            imageSize={ 34 }
            images={ requests.map(r => r.picture) }
          />
          <Text style={ Styles.text }>
            { text } 
          </Text>
        </View>
        <View style={ Styles.flexRow }>
          <Image
            style={ Styles.forward }
            source={ require('../../../../assets/icons/forward.png') }
          />
        </View>
      </View>
    );
  }

};