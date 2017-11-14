import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
    onBookmarksPress: PropTypes.func.isRequired,
    onStatsPress: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.renderUsername = this.renderUsername.bind(this);
  }

  renderUsername () {
    const { username } = this.props.user;

    if (!username) {
      return null;
    }

    return <Name style={ Styles.mainName } text={ username } />;
  }

  renderName () {
    const { user } = this.props;

    if (user.hideName) {
      return null;
    }

    const style = user.username ? Styles.secondaryName : Styles.mainName;

    return <Name style={ style } text={ user.name } />;
  }

  render () {
    const { user, onBookmarksPress, onStatsPress } = this.props;

    return (
      <View>
        <View style={ Styles.top }>
          <Image style={ Styles.image } source={{ uri: user.picture }} />
        </View>
        <View style={ Styles.info }>
          { this.renderUsername() }
          { this.renderName() }
        </View>
        <Bio bio={ user.bio } />
        <View style={ Styles.friendButton }>
          <FriendButton userId={ user.userId } hideIfLoggedInUser />
        </View>
        <View style={ Styles.icons }>
          <TouchableOpacity
            onPress={ onBookmarksPress }
            style={ Styles.icon }
          >
            <Image
              source={require('../../../assets/icons/star-filled.png')}
              style={ Styles.iconImage }
            />
            <Text style={ Styles.iconText }>
              Bookmarks
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ Styles.icon }
            onPress={ onStatsPress }
          >
            <Image
              style={ Styles.iconImage }
              source={ require('../../../assets/icons/stats.png') }
            />
            <Text style={ Styles.iconText }>Statistics</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const Name = ({ style, text }) => {
  return (
    <Text
      adjustsFontSizeToFit
      minimumFontScale={ 0.8 }
      style={ style }
    >
      { text }
    </Text>
  );
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
