import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import actions from '../../actions/';
import { api } from '../../utils/api';
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

    this.state = { pictureUploadVisible: false, note: null };
    this.newPhoto = false;
  }

  componentWillReceiveProps (nextProps) {
    this.newPhoto = false;
    this.setState({ note: nextProps.note });
  }

  /**
   * Save the notes as long as the content is not blank
   * @param {Object} note The note to save
   * @return {Promise}
   */
  save (note) {
    let promises = [];

    return new Promise((resolve) => {
      // New photo needs to be uploaded to S3
      if (this.newPhoto) {
        const { picture } = this.state.note;
        const fileType = picture.slice(picture.indexOf('ext=') + 4);

        // get the signed url for upload to s3
        return api(`signed-s3?fileType=${fileType}`).then(data => {
          note.picture = data.url;
          return resolve();
        });
      }
    })
    .then(() => {
      if (note.content !== '') {
        promises.push(this.props.dispatch(actions.saveNote(note)));
      }

      if (this.props.reloadProject) {
        promises.push(this.props.dispatch(actions.fetchProject(this.props.project._id)));
      }

      return Promise.all(promises);
    });
  }

  remove () {
    this.props.dispatch(actions.deleteNote(this.props.note._id));
  }

  togglePhotoUploader () {
    this.setState({ pictureUploadVisible: !this.state.pictureUploadVisible });
  }

  onPhotoSelect (selectedPictures, picture) {
    const note = Object.assign({}, this.state.note, { picture: picture.uri });
    this.newPhoto = true;
    this.setState({ note });
    this.togglePhotoUploader();
  }

  removePhoto () {
    const note = Object.assign({}, this.state.note);
    delete note.picture;
    this.newPhoto = false;
    this.setState({ note });
  }

  render () {
    const { hideFn, visible, project } = this.props;
    const pictureUploadVisible = this.state.pictureUploadVisible;

    return (
      <AddUpdate
        { ...{ hideFn, visible, pictureUploadVisible, project } }
        note={ this.state.note }
        save={ this.save.bind(this) }
        remove={ this.remove.bind(this) }
        togglePhotoUploader={ this.togglePhotoUploader.bind(this) }
        onPhotoSelect={ this.onPhotoSelect.bind(this) }
        removePhoto={ this.removePhoto.bind(this) }
      />
    );
  }

}

export default connect()(AddUpdateContainer);