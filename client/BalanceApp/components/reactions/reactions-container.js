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
    return (
      <Reactions
        hideExpand={ this.props.hideExpand }
        note={ this.props.note }
        reactions={ this.props.reactions }
        maxList={ this.props.maxList }
      />
    );
  }

}

export default connect()(ReactionsContainer);
