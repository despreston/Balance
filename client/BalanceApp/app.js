/**
 * Balance
 */
import config from './utils/set-config';
global.CONFIG = config;

import React, { Component } from 'react';
import { View, Button, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/index';
import sockets from './utils/sockets';
import Toaster from './components/toaster/toaster';
import MainNavigation from './components/navigation/navigation';
import actions from './actions';

const store = createStore(reducer, applyMiddleware(thunk, sockets));

export default class BalanceApp extends Component {

  navigate () {
    if (this.navigator) {
      return this.navigator.dispatch;
    }
    return function () {};
  }

  render () {
    return (
      <Provider store={ store }>
        <View style={{flex: 1}}>
          <Button onPress={ () => store.dispatch(actions.showNotificationToaster('5923275285942a32e640f00b')) } title="Toggle"/>
          <StatusBar barStyle="light-content" />
          <MainNavigation
            onNavigationStateChange={null}
            ref={ nav => { this.navigator = nav; } }
          />
          <Toaster nav={ this.navigate.bind(this) }/>
        </View>
      </Provider>
    )
  }
  
}