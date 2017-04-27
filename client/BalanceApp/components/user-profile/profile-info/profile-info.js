  // vendors
import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';

// components
import FriendButton from '../../friend-button/friend-button';

// styles
import Styles from './profile-info-styles';

class ProfileInfo extends Component  {

  static propTypes = {
    user: PropTypes.object.isRequired,
    customTextStyle: PropTypes.array
  }

  constructor (props) {
    super(props);
  }

  render () {
    const { user, customTextStyle = [] } = this.props;

    return (
      <View style={ Styles.ProfileInfo }>
        <View style={ Styles.row }>
          <Image style={ Styles.image } source={{ uri: user.picture }} />
          <View style={ Styles.info }>
            <Text
              adjustsFontSizeToFit
              minimumFontScale={ 0.8 }
              style={ [Styles.name, ...customTextStyle] }
            >
              { user.name }
            </Text>
            <Text style={ [Styles.username, ...customTextStyle] }>
              @{ user.username }
            </Text>
          </View>
        </View>
        <Bio bio={ user.bio } />
        <View style={ Styles.friendButton }>
          <FriendButton userId={ user.userId } hideIfLoggedInUser={ true } />
        </View>
      </View>
    );
  }

}

const Bio = ({ bio }) => {
  if (bio && bio.length > 0) {
    return (
      <Text style={ Styles.bio }>
        { bio }
      </Text>
    );
  }

  return null;
}

export default ProfileInfo;