import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Auth0Lock from 'react-native-lock';

// actions
import { fetchUser, setCurrentUser } from '../../actions';

// utils
import { saveToken } from '../../utils/auth';

function mapDispatchToProps (dispatch) {
  return {
    setUser: (id) => dispatch(setCurrentUser(id))
  };
}

class SignOn extends Component {

  constructor () {
    super();

    const { clientId, domain } = CONFIG;

    this.lockModal = new Auth0Lock({ clientId, domain });
  }

  componentWillMount () {
    this.showLogin();
  }

  showLogin () {

    this.lockModal.show({ closable: false }, (err, profile, tokens) => {
      if (err) {
        Promise.reject(err);
      }

      saveToken(tokens.idToken).catch( err => {
        throw 'Could not save token';
      });

      this.props.setUser(profile.userId);
    });

  }

  render () {
    return <View />;
  }

}

export default connect(null, mapDispatchToProps)(SignOn);