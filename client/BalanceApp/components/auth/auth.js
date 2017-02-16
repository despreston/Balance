import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, AsyncStorage } from 'react-native';
import Auth0Lock from 'react-native-lock';

// actions
import { fetchUser, setAuthenticated } from '../../actions';

function mapDispatchToProps (dispatch) {
  return {
    fetchUser: id => dispatch(fetchUser(id)),
    setAuthenticated: () => dispatch(setAuthenticated(true))
  };
}

class Auth extends Component {

  constructor () {
    super();

    this.loadToken().done();

    const { clientId, domain } = CONFIG;
    const options = { auth: { responseType: 'id_token' } };

    this.lock = new Auth0Lock({ clientId, domain, options });
  }

  loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem('AUTH_TOKEN');

      if (!token) {
        this.showLogin();
      } else {
        this.setUser(token);
      }

    } catch (err) {
      console.log(err);
      return;
    }
  }

  setUser (id) {
    this.props.setAuthenticated();
    CONFIG.userId = id;
  }

  saveToken = async (token) => {
    try {
      await AsyncStorage.setItem('AUTH_TOKEN', token);
    } catch (err) {
      return;
    }
  }

  showLogin () {
    const { fetchUser } = this.props;

    this.lock.show({
      closable: false
    }, (err, profile, tokens) => {
      if (err) {
        return;
      }

      this.saveToken(tokens.idToken);
      this.setUser(profile.userId);
    });
  }

  render () {
    return <View />;
  }

}

export default connect(null, mapDispatchToProps)(Auth);