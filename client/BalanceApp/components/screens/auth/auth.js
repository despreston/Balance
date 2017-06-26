import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  PushNotificationIOS,
  AppState,
  Linking
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import actions from '../../../actions/';
import Styles from './auth-styles';
import {
  isLoggedIn,
  parseToken,
  refreshIdToken
} from '../../../utils/auth';

class Auth extends Component {

  static mapStateToProps (state) {
    return { user: state.users[state.loggedInUser] };
  }

  static propTypes = {
    user: PropTypes.object
  }

  constructor (props) {
    super(props);
    this.state = { showLogin: false };
    this.handleAuth();
    this.navigated = false;
    this.deepLinkURL = '';
    this.appState = AppState.currentState;
    this.handleOpenURL = this.handleOpenURL.bind(this);

    Linking.addEventListener('url', e => this.handleOpenURL(e));
    AppState.addEventListener('change', this.onAppStateChange.bind(this));
  }

  componentWillUnmount () {
    Linking.removeEventListener('url', this.handleOpenURL);
    AppState.removeEventListener('change', this.onAppStateChange.bind(this));
  }

  getInitialDeepLink () {
    Linking.getInitialURL()
      .then((url) => {
        if (url) {
          this.handleOpenURL(url);
        }
      })
      .catch(() => {})
  }

  handleOpenURL ({ url }) {
    const { navigate } = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, '');
    const id = route.match(/\/([^]+)\/?$/)[1];
    const routeName = route.split('/')[0];

    switch (routeName) {
      case 'project': return navigate('Project', { project: id });
      case 'note'   : return navigate('Note', { id });
      case 'user'   : return navigate('User', { userId: id });
      default: return;
    }
  }

  onAppStateChange (nextAppState) {
    // App was reopened from the background
    if (this.appState === 'background' && nextAppState === 'active') {
      this.props.dispatch(actions.fetchNotifications());
    }

    this.appState = nextAppState;
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
            dispatch(actions.connectToPiper(token.sub)),
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

  shouldComponentUpdate (nextProps, nextState) {
    const userUpdated = this.props.user !== nextProps.user;
    const showLoginChanged = this.state.showLogin !== nextState.showLogin;
    return userUpdated || showLoginChanged;
  }

  componentDidUpdate () {
    this.handleAuth();
  }

  initPushNotifications () {
    PushNotificationIOS.addEventListener('register', deviceToken => {
      this.props.dispatch(actions.saveDevice(deviceToken));
    });

    PushNotificationIOS.requestPermissions();
  }

  afterLogin () {
    this.initPushNotifications();
  }

  navigateToApp () {
    // prevent multiple navigation dispatches
    if (this.navigated) {
      return;
    }

    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({ routeName: 'App' }) ],
      key: null
    });

    this.navigated = true;
    this.afterLogin();
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