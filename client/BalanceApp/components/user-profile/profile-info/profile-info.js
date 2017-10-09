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
import Bookmarks from '../../bookmarks/bookmarks';

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
      <View style={ Styles.ProfileInfo }>
        <View style={ Styles.row }>
          <Image style={ Styles.image } source={{ uri: user.picture }} />
          <View style={ Styles.info }>
            { this.renderUsername() }
            { this.renderName() }
          </View>
        </View>
        <View style={[ Styles.row, Styles.icons ]}>
          <Bookmarks
            count={ user.bookmark_count }
            onPress={ onBookmarksPress }
          />
          <TouchableOpacity
            style={[ Styles.row, Styles.statsRow ]}
            onPress={ onStatsPress }
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={ require('../../../assets/icons/stats.png') }
            />
            <Text style={ Styles.statsText }>Stats</Text>
          </TouchableOpacity>
        </View>
        <Bio bio={ user.bio } />
        <View style={ Styles.friendButton }>
          <FriendButton userId={ user.userId } hideIfLoggedInUser />
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
