import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import Colors from '../colors';

class Refresh extends Component {

  static propTypes = {
    refreshing: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired,
    tintColor: PropTypes.string,
    styles: PropTypes.number
  }

  render () {
    return (
      <RefreshControl
        style={ this.props.styles }
        tintColor={ this.props.tintColor || Colors.purple }
        refreshing={ this.props.refreshing }
        onRefresh={ () => this.props.onRefresh() }
      />
    );
  }

}

export default Refresh;