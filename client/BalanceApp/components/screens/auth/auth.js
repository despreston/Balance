import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';

// actions
import actions from '../../../actions/';

import Styles from './auth-styles';

// utils
import {
  isLoggedIn,
  parseToken,
  refreshIdToken
} from '../../../utils/auth';

class Auth extends Component {

  static mapStateToProps (state) {
    return { user: state.users[state.loggedInUser] };
  }

  constructor (props) {
    super(props);

    this.state = { showLogin: false };

    this.handleAuth();
  }

  handleAuth () {
    const { user, dispatch } = this.props;

    // is token valid?
    isLoggedIn().then(authenticated => {
      if (authenticated) {
        
        // user has already logged in
        if (user) {
          return this.navigateToApp();
        }

        refreshIdToken()
        .then(parseToken)
        .then(token => {
          return Promise.all([
            dispatch(actions.fetchNotifications()),
            dispatch(actions.requestUser(token.sub, true))
          ]);
        })
        .then(() => {
          if (this.state.showLogin) {
            this.setState({ showLogin: false });
          }
          this.navigateToApp();
        });
      } else {
        if (!this.state.showLogin) {
          this.setState({ showLogin: true });
        }
      }
    });
  }

  componentDidUpdate () {
    this.handleAuth();
  }

  navigateToApp () {
    // prevent multiple navigations
    if (this.props.navigation.state.routeName !== 'Login') {
      return;
    }

    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({ routeName: 'App' }) ],
      key: null
    });

    this.props.navigation.dispatch(actionToDispatch);
  }

  render () {
    const icon = require('../../../assets/icons/icon-white.png');
    const { dispatch } = this.props;

    return (
      <View style={ Styles.container }>
        <Image source={ icon } style={ Styles.icon }/>
        <Text style={ Styles.title }>
          Hello!
        </Text>
        <Text style={[ Styles.white, Styles.subtitle ]}>
          Welcome to <Text style={ Styles.bold }>Balance</Text>
        </Text>
        {
          this.state.showLogin &&
          <TouchableOpacity style={ Styles.button } onPress={ () => dispatch(actions.login()) }>
            <Text style={[ Styles.bold, Styles.white ]}>Get started</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }

}

export default connect(Auth.mapStateToProps)(Auth);