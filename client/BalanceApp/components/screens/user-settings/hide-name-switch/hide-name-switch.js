import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Switch }           from 'react-native';
import Colors               from '../../../colors';

class HideNameSwitch extends Component {

  static propTypes = {
    value: PropTypes.bool.isRequired,
    onValueChange: PropTypes.func.isRequired
  }

  render () {
    return (
      <Switch
        onTintColor={ Colors.purple }
        value={ this.props.value }
        onValueChange={ this.props.onValueChange }
      />
    );
  }

}

export default HideNameSwitch;
