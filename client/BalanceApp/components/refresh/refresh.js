import React, { Component, PropTypes } from 'react';
import { RefreshControl } from 'react-native';

class Refresh extends Component {

  static propTypes = {
    refreshing: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired
  }

  render () {
    return (
      <RefreshControl
        refreshing={ this.props.refreshing }
        onRefresh={ () => this.props.onRefresh() }
      />
    );
  }

}

export default Refresh;