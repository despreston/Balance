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
    reloadProject: PropTypes.bool,
    note: PropTypes.object
  }

  constructor (props) {
    super(props);

    this.state = { pictureUploadVisible: false };
  }

  /**
   * Save the notes as long as the content is not blank
   * @param {Object} note The note to save
   * @return {Promise}
   */
  save (note) {
    let promises = [];

    if (note.content !== '') {
      promises.push(this.props.dispatch(actions.saveNote(note)));
    }

    if (this.props.reloadProject) {
      promises.push(this.props.dispatch(actions.fetchProject(this.props.project._id)));
    }

    return Promise.all(promises);
  }

  remove () {
    this.props.dispatch(actions.deleteNote(this.props.note._id));
  }

  togglePhotoUploader () {
    this.setState({ pictureUploadVisible: !this.state.pictureUploadVisible });
  }

  render () {
    const { hideFn, note, visible, project } = this.props;
    const pictureUploadVisible = this.state.pictureUploadVisible;

    return (
      <AddUpdate
        { ...{ note, hideFn, visible, pictureUploadVisible, project } }
        save={ this.save.bind(this) }
        remove={ this.remove.bind(this) }
        togglePhotoUploader={ this.togglePhotoUploader.bind(this) }
      />
    );
  }

}

export default connect()(AddUpdateContainer);