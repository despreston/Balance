import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

// actions
import actions from '../../../actions/';
// import { login, requestUser } from '../../../actions';

// utils
import { isLoggedIn, parseToken } from '../../../utils/auth';

class Auth extends Component {

  static mapStateToProps (state) {
    return { user: state.users[state.loggedInUser] };
  }

  constructor (props) {
    super(props);

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
        parseToken()
        .then(token => {
          return Promise.all([
            dispatch(actions.fetchNotifications()),
            dispatch(actions.requestUser(token.sub, true))
          ]);
        })
        .then(() => this.navigateToApp());
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
    const { dispatch } = this.props;
    return <Button onPress={ () => dispatch(actions.login()) } title='Login' />;
  }

}

export default connect(Auth.mapStateToProps)(Auth);