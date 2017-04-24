import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';

// actions
import actions from '../../actions/';

// components
import AddUpdate from './add-update';

class AddUpdateContainer extends Component {

  static propTypes = {
    hideFn: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    project: PropTypes.object.isRequired,
    reloadProject: PropTypes.bool
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
      promises.push(this.props.dispatch(actions.saveNote(past)));
    }

    if (future.content !== '') {
      promises.push(this.props.dispatch(actions.saveNote(future)));
    }

    if (this.props.reloadProject) {
      promises.push(this.props.dispatch(actions.fetchProject(this.props.project)));
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

export default connect()(AddUpdateContainer);