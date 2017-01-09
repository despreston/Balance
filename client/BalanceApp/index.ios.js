/**
 * Balance iOS
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import config from './config/development';
import MainNavigation from './components/main/navigation';

global.CONFIG = config;

class BalanceApp extends Component {

  getUser() {
    return fetch(CONFIG.apiUrl + 'users/5871bc0a55a740d63cafd9a5')
      .then(response => {
        return response.json(); 
      })
      .then(json => {
        this.setState({ user: json.firstName });
        return json;
      })
      .catch(err => {
      }).done();
  }
  
  render() {
    return (
      <MainNavigation/>
    )
  }
}

AppRegistry.registerComponent('BalanceApp', () => BalanceApp);
