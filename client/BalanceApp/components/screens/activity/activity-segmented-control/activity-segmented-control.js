import React, { PropTypes, Component } from 'react';
import { SegmentedControlIOS, View } from 'react-native';
import Colors from '../../../colors';
import Styles from './activity-segmented-control-styles';

export default class ActivitySegmentedControl extends Component {
  
  static propTypes = {
    onSelection: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props);
    this.values = [ 'Friends', 'Global' ];
  }

  render () {
    return (
      <View style={ Styles.container }>
        <SegmentedControlIOS
          selectedIndex={ this.values.findIndex(v => v === this.props.selected) }
          onValueChange={ val => this.props.onSelection(val) }
          values={ this.values }
          tintColor={ Colors.white }
        />
      </View>
    );
  }

}