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
import MainNavigation from './components/navigation/navigation';
import { fetchUser } from './actions';
import reducer from './reducers/index';

// Utils
import config from './utils/set-config';

console.log(config)

global.CONFIG = config;

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

class BalanceApp extends Component {

  componentWillMount () {
    store.dispatch(fetchUser());
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
