import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import Styles from './nav-button-styles';

class NavButton extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    buttonStyle: PropTypes.number,
    onPress: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <TouchableOpacity
        onPress={ () => this.props.onPress() }
        style={ [Styles.navButton, this.props.buttonStyle] }
      >
        <Text style={ Styles.buttonText }>{ this.props.label }</Text>
      </TouchableOpacity>
    );
  }

}

export default NavButton;