import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { VictoryBar } from 'victory-native';

class UserStats extends Component {

  static propTypes = {
    stats: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);
  }

  render () {
    return <VictoryBar />;
  }
}

export default UserStats;
