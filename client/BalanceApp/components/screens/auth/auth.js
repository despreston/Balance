import React, { Component, PropTypes } from 'react';
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
  getRefreshToken,
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

    if (user) {
      return;
    }

    // is token valid?
    isLoggedIn().then(authenticated => {
      if (authenticated) {
        refreshIdToken()
        .then(parseToken)
        .then(token => {
          return Promise.all([
            dispatch(actions.fetchNotifications()),
            dispatch(actions.requestUser(token.sub, true))
          ]);
        })
        .then(() => this.navigateToApp());
      } else {
        this.setState({ showLogin: true });
      }
    });
  }

  componentDidUpdate () {
    this.handleAuth();
  }

  navigateToApp () {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({ routeName: 'App' }) ]
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