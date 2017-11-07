import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Styles from './stat-styles';

class Stat extends Component {

  static propTypes = {
    description: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    text: PropTypes.object.isRequired
  }

  render () {
    return (
      <View style={[ Styles.stat, { backgroundColor: this.props.color } ]}>
        <View>
          <Text style={ Styles.description }>
            { this.props.description.toUpperCase() }
          </Text>
          { this.props.text }
        </View>
      </View>
    );
  }
}

export default Stat;
