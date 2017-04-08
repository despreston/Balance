import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Styles from '../reactions-styles';

export default class Reaction extends Component {

  static propTypes = {
    reaction: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
  }

  render () {
    return (
      <TouchableOpacity style={[ Styles.iconContainer, Styles.reaction ]} onPress={ () => null }>
        <Text>{ this.props.reaction }</Text>
        <Text style={ Styles.count }>{ this.props.count }</Text>
      </TouchableOpacity>
    );
  }

}
