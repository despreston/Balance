import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';

// actions
import { saveNote } from '../../actions';

// components
import AddUpdate from './add-update';

class AddUpdateContainer extends Component {

  static propTypes = {
    // inputs
    hideFn: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    project: PropTypes.object.isRequired,

    // from react-redux
    saveNote: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
  }

  /**
   * Save the notes as long as the content is not blank
   * @param {Object} past Past note to save. null to leave blank
   * @param {Object} future Future note to save. null to leave blank
   * @return {Promise}
   */
  save (past, future) {
    let promises = [];

    if (past.content !== '') {
      promises.push(this.props.saveNote(past));
    }

    if (future.content !== '') {
      promises.push(this.props.saveNote(future));
    }

    return Promise.all(promises);
  }

  render () {
    const { hideFn, visible, project } = this.props;

    return (
      <AddUpdate
        hideFn={ hideFn }
        save={ this.save.bind(this) }
        visible={ visible }
        project={ project }
      />
    );
  }

}

export default connect(null, { saveNote })(AddUpdateContainer);