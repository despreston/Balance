import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Styles from './stat-styles';

class Stat extends Component {

  static propTypes = {
    description: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    icon: PropTypes.number.isRequired,
    text: PropTypes.object.isRequired
  }

  render () {
    return (
      <View style={[ Styles.stat, { borderColor: this.props.color } ]}>
        <Image source={ this.props.icon } style={ Styles.icon } />
        <View>
          <Text style={ Styles.description }>
            { this.props.description }
          </Text>
          { this.props.text }
        </View>
      </View>
    );
  }
}

export default Stat;
