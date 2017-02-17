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
    setCurrentUser: () => dispatch(setCurrentUser(true))
  };
}

class SignOn extends Component {

  constructor () {
    super();

    const { clientId, domain } = CONFIG;

    this.lock = new Auth0Lock({ clientId, domain });
  }

  componentWillMount () {
    this.showLogin();
  }

  showLogin () {

    this.lock.show({
      closable: false
    }, (err, profile, tokens) => {
      if (err) {
        Promise.reject(err);
      }

      saveToken(tokens.idToken).catch(Promise.reject);

      this.props.setCurrentUser(profile.userId);
    });

  }

  render () {
    return <View />;
  }

}

export default connect(null, mapDispatchToProps)(SignOn);