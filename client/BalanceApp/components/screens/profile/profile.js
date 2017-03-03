// vendors
import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

// components
import ProfileInfo from '../../profile-info/profile-info';
import Logout from '../../signon/logout';
import NavBtn from '../../navigation/nav-btn';

// styles
import Styles from './profile-styles';

function mapStateToProps (state) {
  return {
    user: state.loggedInUser
  };
}

class Profile extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  };

  static navigationOptions = {
    header: ({ state, navigate, dispatch }, defaultHeader) => ({
      
      ...defaultHeader,
      
      right: (
        <NavBtn
          onPress={() => null}
          title="Edit"
        />
      )
    })
  };
  
  render () {
    if (!this.props.user) { return null; }

    return (
      <View style={Styles.profile}>
        <View style={Styles.profileInfo}>
          <ProfileInfo user={this.props.user} hideProjects={true} />
        </View>
        <Logout />
      </View>
    );
  }

};

export default connect(mapStateToProps)(Profile);