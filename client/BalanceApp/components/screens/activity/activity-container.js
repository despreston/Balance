import React, { Component, PropTypes } from 'react';
import { View, AsyncStorage } from 'react-native';
import Activity from './activity';
import ActivitySegmentedControl from './activity-segmented-control/activity-segmented-control';

export default class ActivityContainer extends Component {

  static navigationOptions = {
    headerStyle: {
      height: 20,
      backgroundColor: '#432B52'
    }
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);

    this.state = { screen: null };

    this.loadScreen().then(screen => {
      if (!screen) {
        screen = 'Friends';
      }
      this.setState({ screen });
    });
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

  onNoteSelect (id) {
    this.props.navigation.navigate('Note', { id });
  }

  render () {
    if (!this.state.screen) {
      return null;
    }

    return (
      <View style={{flex: 1}}>
        <ActivitySegmentedControl
          onSelection={ this.onScreenChange.bind(this) }
          selected={ this.state.screen }
        />
        <Activity
          onSelect={ this.onNoteSelect.bind(this) }
          screen={ this.state.screen }
        />
      </View>
    );
  }

}
