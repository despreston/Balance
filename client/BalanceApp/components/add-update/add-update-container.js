import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import actions from '../../actions/';
import { api } from '../../utils/api';
import s3upload from '../../utils/s3-upload';
import AddUpdate from './add-update';
import ImagePicker from 'react-native-image-picker';

class AddUpdateContainer extends Component {

  static propTypes = {
    isNew: PropTypes.bool,
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
          // set the url to the s3 path
          note.picture = data.url;
          return resolve(s3upload(data.fileName, picture, data.url));
        });
      }
      
      return resolve();
    })
    .then(() => {
      this.newPhoto = false;
      const { dispatch } = this.props;

      // Picture needs to be deleted
      if (this.props.note && this.props.note.picture && !note.picture) {
        promises.push(dispatch(actions.deletePictureFromNote(note._id)));
      }
      
      promises.push(dispatch(actions.saveNote(note)));

      // force reload of project
      if (this.props.reloadProject) {
        promises.push(dispatch(actions.fetchProject(this.props.project._id)));
      }

      return Promise.all(promises);
    });
  }

  remove () {
    this.props.dispatch(actions.deleteNote(this.props.note._id));
  }

  togglePhotoUploader () {
    const options = {
      title: null,
      noData: true,
      mediaType: 'photo'
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (!response.didCancel && !response.error) {
        let source = { uri: response.origURL };
        this.onPhotoSelect(source);
      }
    });
  }

  onPhotoSelect (picture) {
    const note = Object.assign({}, this.state.note, { picture: picture.uri });
    this.newPhoto = true;
    this.setState({ note });
  }

  removePhoto () {
    const note = Object.assign({}, this.state.note);
    delete note.picture;
    this.newPhoto = false;
    this.setState({ note });
  }

  render () {
    const { hideFn, visible, project, isNew } = this.props;

    return (
      <AddUpdate
        { ...{ hideFn, visible, project, isNew } }
        note={ this.state.note }
        save={ this.save.bind(this) }
        remove={ this.remove.bind(this) }
        togglePhotoUploader={ this.togglePhotoUploader.bind(this) }
        removePhoto={ this.removePhoto.bind(this) }
      />
    );
  }

}

export default connect()(AddUpdateContainer);