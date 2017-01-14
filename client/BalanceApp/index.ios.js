/**
 * Balance iOS
 */
// Vendors
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

// Components
import config from './config/development';
import MainNavigation from './components/main/navigation';
import { receiveUser, requestUserFailed } from './actions';
import balance from './reducers';

global.CONFIG = config;
const store = createStore(balance, applyMiddleware(thunkMiddleware));

class BalanceApp extends Component {
  getUser() {
    return fetch(CONFIG.apiUrl + 'users/5871bc0a55a740d63cafd9a5')
      .then(response => response.json())
      .then(json => store.dispatch(receiveUser(json)))
      .catch(err => store.dispatch(requestUserFailed(err)))
      .done();
  }

  componentWillMount () {
    this.getUser();
  }
  
  render () {
    return (
      <Provider store={store}>
        <MainNavigation/>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('BalanceApp', () => BalanceApp);
