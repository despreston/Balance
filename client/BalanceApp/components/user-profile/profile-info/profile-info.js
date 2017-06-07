import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import FriendButton from '../../friend-button/friend-button';
import Styles from './profile-info-styles';

class ProfileInfo extends Component  {

  static propTypes = {
    user: PropTypes.object.isRequired,
    customTextStyle: PropTypes.array
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
        <Bookmarks count={ user.bookmark_count } />
        <Bio bio={ user.bio } />
        <View style={ Styles.friendButton }>
          <FriendButton userId={ user.userId } hideIfLoggedInUser />
        </View>
      </View>
    );
  }

}

const Bookmarks = ({ count }) => {
  const text = (count > 1 || count === 0) ? 'Bookmarks' : 'Bookmark';
  return (
    <View style={ Styles.row }>
      <TouchableOpacity style={[ Styles.row, Styles.bookmarkContainer ]}>
        <Image
          source={require('../../../assets/icons/star-filled.png')}
          style={{width: 15, height: 15}}
        />
        <Text style={[ Styles.selectedContext, Styles.bold ]}>
          {` ${count} ${text}`}
        </Text>
      </TouchableOpacity>
    </View>
  )
};

const Bio = ({ bio }) => {
  if (bio && bio.length > 0) {
    return (
      <Text style={ Styles.bio }>
        { bio }
      </Text>
    );
  }

  return null;
};

export default ProfileInfo;