// Vendors
import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

export default class ProjectDetail extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired
  }

  constructor (props) {
    super()
  }

  render () {
    return (<View>
      <Text>{this.props.project.title}</Text>
    </View>);
  }
}