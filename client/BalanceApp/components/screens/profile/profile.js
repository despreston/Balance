// vendors
import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

// components
import ProfileInfo from '../../profile-info/profile-info';
import Logout from '../../signon/logout';

// styles
import Styles from './profile-styles';

function mapStateToProps (state) {
  return {
    user: state.users[state.current_user]
  };
}

class Profile extends Component {

  static propTypes = {
    user: PropTypes.object
  };
  
  render () {
    if (!this.props.user) { return null; }

    return (
      <View style={Styles.profile}>
        <View style={Styles.profileInfo}>
          <ProfileInfo user={this.props.user} />
        </View>
        <Logout />
      </View>
    );
  }

};

export default connect(mapStateToProps)(Profile);