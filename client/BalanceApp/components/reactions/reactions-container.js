import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// components
import Reactions from './reactions';

class ReactionsContainer extends Component {

  static propTypes = {
    reactions: PropTypes.array,
    note: PropTypes.string.isRequired
  }

  render () {
    return <Reactions note={ this.props.note } reactions={ this.props.reactions }/>;
  }

}

export default connect()(ReactionsContainer);
