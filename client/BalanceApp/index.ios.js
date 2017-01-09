/**
 * Balance iOS
 */

import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';
import config from './config/development';

global.CONFIG = config;

class BalanceApp extends Component {
  constructor() {
    super();
    this.state = { user: '', test: 'hello' };
  }

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
        // console.log(err);
      }).done();
  }

  componentWillMount() {
    this.getUser();
  }
  
  render() {
    return (
      <Text>Hello, { this.state.user }</Text>
    );
  }
}

AppRegistry.registerComponent('BalanceApp', () => BalanceApp);
