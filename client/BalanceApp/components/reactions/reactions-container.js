import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// components
import Reactions from './reactions';

class ReactionsContainer extends Component {

  render () {
    return (
      <Reactions />
    );
  }

}

export default connect()(ReactionsContainer);
