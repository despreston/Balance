/**
 * Balance iOS
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import config from './config/development';
import MainNavigation from './components/main/navigation';
import { addUser } from './actions';
import balance from './reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

global.CONFIG = config;
let store = createStore(balance);

class BalanceApp extends Component {
  getUser() {
    return fetch(CONFIG.apiUrl + 'users/5871bc0a55a740d63cafd9a5')
      .then(response => response.json())
      .then(json => store.dispatch(addUser(json)))
      .catch(err => console.log(err))
      .done();
  }

  componentWillMount() {
    this.getUser();
  }
  
  render() {
    return (
      <Provider store={store}>
        <MainNavigation/>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('BalanceApp', () => BalanceApp);
