// vendors
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// components
import NavBtn from '../../navigation/nav-btn';
import UserProfile from '../../user-profile/user-profile';
import Icon from '../../navigation/icon';

function mapStateToProps (state) {
  return { loggedInUser: state.loggedInUser };
}

class Profile extends Component {

  static navigationOptions = {
    header: ({ state, navigate: nav, dispatch }, defaultHeader) => ({
      
      ...defaultHeader,

      title: 'Profile',

      left: (
        <Icon
          imagePath={ require('../../../assets/icons/users.png') }
          onPress={ () => nav('UserSearch') }
         />
      ),
      
      right: (
        <Icon
          imagePath={ require('../../../assets/icons/settings.png') }
          onPress={ () => nav('UserSettings') }
         />
      )
    })
  };
  
  render () {
    const { navigate } = this.props.navigation;

    if (!this.props.loggedInUser) { return null; }

    return <UserProfile userId={ this.props.loggedInUser } nav={ navigate } />;
  }

};

export default connect(mapStateToProps)(Profile);