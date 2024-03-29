import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import actions from '../../../../actions';

import Styles from './mark-as-complete-styles';

class MarkAsComplete extends Component {

  static propTypes = {
    note: PropTypes.shape({
      type: PropTypes.string.isRequired
    }).isRequired
  }

  constructor (props) {
    super(props);
  }

  markAsComplete () {
    const note = { _id: this.props.note._id, type: 'Past' };

    this.props.dispatch(actions.saveNote(note));
  }

  render () {
    return (
      <TouchableOpacity
        style={ Styles.container }
        onPress={ () => this.markAsComplete() }
      >
        <Text style={ Styles.text }>Mark as complete</Text>
      </TouchableOpacity>
    );
  }

}

export default connect()(MarkAsComplete);