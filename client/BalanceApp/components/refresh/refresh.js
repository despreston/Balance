import React, { Component, PropTypes } from 'react';
import { RefreshControl } from 'react-native';
import Colors from '../colors';

class Refresh extends Component {

  static propTypes = {
    refreshing: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired
  }

  render () {
    return (
      <RefreshControl
        tintColor={ Colors.purple }
        refreshing={ this.props.refreshing }
        onRefresh={ () => this.props.onRefresh() }
      />
    );
  }

}

export default Refresh;