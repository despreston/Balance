import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  PushNotificationIOS,
  AppState
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
    return {
      user: state.users[state.loggedInUser],
      devices: state.devices
    };
  }

  static propTypes = {
    user: PropTypes.object,
    devices: PropTypes.object
  }

  constructor (props) {
    super(props);
    this.state = { showLogin: false };
    this.handleAuth();
    this.navigated = false;
    this.appState = AppState.currentState;

    AppState.addEventListener('change', this.onAppStateChange.bind(this));
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this.onAppStateChange.bind(this));
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
            dispatch(actions.requestUser(token.sub, true)),
            dispatch(actions.fetchDevices())
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
      const devicesArray = Object.keys(this.props.devices).map(id => this.props.devices[id]);
      const tokenExists = devicesArray.find(d => d.deviceToken === deviceToken);
      let token = tokenExists || { _new: true, deviceToken };

      this.props.dispatch(actions.saveDevice(token));
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