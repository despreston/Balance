/**
 * Balance
 */

// Vendors
import React, { Component, AppRegistry } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

// Components
import config from './utils/set-config';
import MainNavigation from './components/navigation/navigation';
import { fetchUser } from './actions';
import reducer from './reducers/index';

global.CONFIG = config;

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default class BalanceApp extends Component {
  
  render () {
    return (
      <Provider store={store}>
        <MainNavigation/>
      </Provider>
    )
  }
  
}