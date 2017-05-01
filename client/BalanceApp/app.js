/**
 * Balance
 */

// Vendors
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

// utils
import config from './utils/set-config';
import reducer from './reducers/index';

// Components
import MainNavigation from './components/navigation/navigation';

global.CONFIG = config;

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default class BalanceApp extends Component {
  
  render () {
    return (
      <Provider store={ store }>
        <MainNavigation onNavigationStateChange={null} />
      </Provider>
    )
  }
  
}