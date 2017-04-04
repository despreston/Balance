import React, { Component, PropTypes } from 'react';
import { View, SegmentedControlIOS } from 'react-native';

import Styles from './project-filter-styles';
import Colors from '../../colors';

export default class ProjectFilter extends Component {

  static propTypes = {
    onChange: PropTypes.func
  }
  
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <View style={ Styles.container }>
        <SegmentedControlIOS
          onValueChange={ val => this.props.onChange(val) }
          values={[ 'All', 'In Progress', 'Finished' ]}
          tintColor={ Colors.white }
        />
      </View>
    )
  }
  
}