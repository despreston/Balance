import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
import * as auth from '../../../utils/auth';
import { api } from '../../../utils/api';
import Auth0 from 'react-native-auth0';

const icon = require('../../../assets/icons/icon-white.png');

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
    this.deepLinkURL = '';
    this.appState = AppState.currentState;
    this.handleOpenURL = this.handleOpenURL.bind(this);

    this.auth0 = new Auth0({
      domain: CONFIG.domain,
      clientId: CONFIG.clientId
    });

    this.initAuth();

    Linking.addEventListener('url', e => this.handleOpenURL(e));
    AppState.addEventListener('change', this.onAppStateChange.bind(this));
  }

  componentWillUnmount () {
    Linking.removeEventListener('url', this.handleOpenURL);
    AppState.removeEventListener('change', this.onAppStateChange.bind(this));
  }

  async getInitialDeepLink () {
    const url = await Linking.getInitialURL();

    if (url) {
      this.handleOpenURL(url);
    }
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
      default       : return;
    }
  }

  onAppStateChange (nextAppState) {
    // App was reopened from the background
    if (this.appState === 'background' && nextAppState === 'active') {
      this.props.dispatch(actions.fetchNotifications());
      this.props.dispatch(actions.requestUser(this.props.user.userId));
    }

    this.appState = nextAppState;
  }

  async initAuth () {
    const authenticated = await auth.isLoggedIn();

    if (authenticated) {
      this.login();
    } else if (!this.state.showLogin) {
      this.setState({ showLogin: true });
    }
  }

  initPushNotifications () {
    PushNotificationIOS.addEventListener('register', deviceToken => {
      this.props.dispatch(actions.saveDevice(deviceToken));
    });

    PushNotificationIOS.requestPermissions();
  }

  navigateToApp () {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({ routeName: 'App' }) ],
      key: null
    });

    this.initPushNotifications();
    this.props.navigation.dispatch(actionToDispatch);
  }

  fetchAuth0UserInfo (accessToken) {
    const properties = {
      headers: new Headers({ Authorization: `Bearer ${accessToken}` })
    };

    return api('https://balanceapp.auth0.com/userinfo', properties, true);
  }

  connectUser (userId) {
    const { dispatch } = this.props;

    return Promise.all([
      dispatch(actions.connectToPiper(userId)),
      dispatch(actions.fetchNotifications()),
      dispatch(actions.requestUser(userId, true))
    ]);
  }

  async showAuth0 () {
    const opts = { scope: 'openid offline_access profile' };
    const tokens = await this.auth0.webAuth.authorize(opts);

    await auth.saveRefreshToken(tokens.refreshToken);
    await auth.saveAuthToken(tokens.idToken);

    const profile = await this.fetchAuth0UserInfo(tokens.accessToken);

    if (profile.extraInfo && profile.extraInfo.picture_large) {
      profile.picture = profile.extraInfo.picture_large;
    }

    const user = await api('users', { method: 'POST', body: profile });

    this.props.dispatch(actions.setLoggedInUser(user));
    await this.connectUser(user.userId);
    this.navigateToApp();
  }

  async login () {
    await auth.refreshIdToken();
    const { sub: userId } = await auth.parseToken();
    await this.connectUser(userId);
    this.navigateToApp();
  }

  render () {
    return (
      <View style={ Styles.container }>
        <Image source={ icon } style={ Styles.icon }/>
        <Text style={ Styles.title }>
          Balance
        </Text>
        <View>
          <Text style={[ Styles.text, Styles.bold ]}>
            Share
          </Text>
          <Text style={[ Styles.text, Styles.subtitle ]}>
            Show your projects to the world or keep them private. Up to you.
          </Text>

          <Text style={[ Styles.text, Styles.bold ]}>
            Encourage
          </Text>
          <Text style={[ Styles.text, Styles.subtitle ]}>
            Make sure your friends finish their side projects. Finally.
          </Text>

          <Text style={[ Styles.text, Styles.bold ]}>
            Follow
          </Text>
          <Text style={[ Styles.text, Styles.subtitle ]}>
            Discover projects and get notified when they've been updated.
          </Text>
        </View>
        {
          this.state.showLogin &&
          <TouchableOpacity
            style={ Styles.button }
            onPress={ () => this.showAuth0() }
          >
            <Text style={[ Styles.bold, Styles.text, Styles.buttonText ]}>
              Get started
            </Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

export default connect(Auth.mapStateToProps)(Auth);
