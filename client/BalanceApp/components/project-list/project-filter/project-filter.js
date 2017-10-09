import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, SegmentedControlIOS } from 'react-native';

import Styles from './project-filter-styles';
import Colors from '../../colors';

export default class ProjectFilter extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired
  }
  
  constructor (props) {
    super(props);

    this.values = [ 'All', 'In Progress', 'Finished' ];
  }

  render () {
    return (
      <View style={ Styles.container }>
        <SegmentedControlIOS
          selectedIndex={ this.values.findIndex(v => v === this.props.filter) }
          onValueChange={ val => this.props.onChange(val) }
          values={ this.values }
          tintColor={ Colors.white }
        />
      </View>
    )
  }
  
}