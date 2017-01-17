// Vendors
import React, { Component } from 'react';
import {
  Navigator,
  TouchableHighlight,
  Text
} from 'react-native';

// Components
import MainScene from './main';
import ProjectDetail from '../project-detail/project-detail';
import { styles } from './navigation-styles';

export default class MainNavigation extends Component {
  renderScene (route, nav) {
    switch (route.scene) {
      case 'main':
        return <MainScene navigator={nav} />;
      case 'project-detail':
        return <ProjectDetail navigator={nav} {...route.passProps} />
    }
  }

  renderLeftButton (route, navigator, index, navState) {
    if (route.leftButton) {
      return route.leftButton;
    }

    return (
      <TouchableHighlight>
        <Text style={[styles.button, styles.text]}>?!</Text>
      </TouchableHighlight>
    );
  }

  renderRightButton (route, navigator, index, navState) {
    if (route.rightButton) {
      return route.rightButton;
    }

    return (
      <TouchableHighlight>
        <Text style={ [styles.button, styles.text] }>✚</Text>
      </TouchableHighlight>
    );
  }

  renderTitle (route, navigator, index, navState) {
    if (route.renderTitle) {
      return route.renderTitle;
    }

    return (<Text style={ [styles.title, styles.text] }>{route.title}</Text>);
  }

	render() {
    return (
      <Navigator
        initialRoute={{ title: "BALANCE", index: 0, scene: "main" }}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: this.renderLeftButton,
              RightButton: this.renderRightButton,
              Title: this.renderTitle
            }}
            style={ styles.view }
          />
        }
        sceneStyle={{ paddingTop: 64 }}
        renderScene={(route, navigator) => this.renderScene(route, navigator)}
      />
    )
  }
}