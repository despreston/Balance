'use strict';

import React, { Component } from 'react';
import {
  Navigator,
  TouchableHighlight,
  Text
} from 'react-native';
import MainScene from './main';

export default class MainNavigation extends Component {
	render() {
    return (
      <Navigator
        initialRoute={{ title: "BALANCE", index: 0 }}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) => {
                return (
                  <TouchableHighlight>
                    <Text style={[styles.button, styles.text]}>?!</Text>
                  </TouchableHighlight>
                );
              },
              RightButton: (route, navigator, index, navState) => { 
                return (
                  <TouchableHighlight>
                    <Text style={[styles.button, styles.text]}>New</Text>
                  </TouchableHighlight>
                ); 
              },
              Title: (route, navigator, index, navState) =>
              { return (<Text style={[styles.title, styles.text]}>BALANCE</Text>); }
            }}
            style={styles.view}
          />
        }
        sceneStyle={{paddingTop: 64}}
        renderScene={(route, navigator) => <MainScene/>}
      />
    )
  }
}

const styles = {
  view: {
    backgroundColor: "#333333"
  },
  title: {
    fontFamily: "Helvetica Neue",
    letterSpacing: 5
  },
  button: {
    paddingHorizontal: 10
  },
  text: {
    paddingTop: 10,
    fontSize: 18,
    color: "#FFFFFF"
  }
};