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
        renderScene={(route, navigator) =>
          <MainScene
            title={route.title}

            onForward={() => {
              const nextIndex = route.index += 1;
              navigator.push({
                title: 'Scene' + nextIndex,
                index: nextIndex
              });
            }}

            onBack={() => {
              console.log(route.index);
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />
        }
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
    color: "#EEEEEE"
  }
};