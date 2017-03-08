// vendors
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// components
import NavBtn from '../../navigation/nav-btn';
import UserProfile from '../../user-profile/user-profile';


function mapStateToProps (state) {
  return {
    loggedInUser: state.loggedInUser
  };
}

class Profile extends Component {

  static navigationOptions = {
    header: ({ state, navigate, dispatch }, defaultHeader) => ({
      
      ...defaultHeader,
      
      right: (
        <NavBtn
          onPress={() => navigate('UserSettings')}
          title="Edit"
        />
      )
    })
  };
  
  render () {
    const { navigate } = this.props.navigation;

    if (!this.props.loggedInUser) { return null; }

    return <UserProfile userId={this.props.loggedInUser} nav={navigate} />;
  }

};

export default connect(mapStateToProps)(Profile);