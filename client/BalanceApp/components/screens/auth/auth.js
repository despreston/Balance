import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

// actions
import { login, requestUser } from '../../../actions';

// utils
import { isLoggedIn, parseToken } from '../../../utils/auth';

function mapStateToProps (state) {
  return { user: state.users[state.loggedInUser] };
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCurrentUser: (userId) => dispatch(requestUser(userId, true)),
    login: () => dispatch(login())
  };
}

class Auth extends Component {

  static propTypes = {
    fetchCurrentUser: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);

    this.handleAuth();
  }

  handleAuth () {
    const { user } = this.props;

    if (user) {
      return;
    }

    // is token valid?
    isLoggedIn().then(authenticated => {
      if (authenticated) {
        parseToken()
        .then(token => this.props.fetchCurrentUser(token.sub))
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
    return <Button onPress={ () => this.props.login() } title='Login' />;
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);