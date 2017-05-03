import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import Activity from './activity';
import ActivitySegmentedControl from './activity-segmented-control/activity-segmented-control';

export default class ActivityContainer extends Component {

  static navigationOptions = {
    title: 'Activity'
  }

  constructor (props) {
    super(props);

    this.state = { screen: 'Friends' };

    this.loadScreen().then(screen => this.setState({ screen }));
  }

  loadScreen () {
    return AsyncStorage.getItem('ACTIVITY_SCREEN');
  }

  saveScreen (value) {
    return AsyncStorage.setItem('ACTIVITY_SCREEN', value);
  }

  onScreenChange (screen) {
    this.saveScreen(screen).then(() => this.setState({ screen }));
  }
  
  render () {
    return (
      <View>
        <ActivitySegmentedControl
          onSelection={ this.onScreenChange.bind(this) }
          selected={ this.state.screen }
        />
        <Activity screen={ this.state.screen }/>
      </View>
    );
  }

}