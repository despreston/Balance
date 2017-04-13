import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// components
import Reactions from './reactions';

class ReactionsContainer extends Component {

  static propTypes = {
    reactions: PropTypes.array,
    note: PropTypes.string.isRequired,
    maxList: PropTypes.number.isRequired,
    hideExpand: PropTypes.bool
  }

  render () {
    return <Reactions { ...this.props } />;
  }

}

export default connect()(ReactionsContainer);
