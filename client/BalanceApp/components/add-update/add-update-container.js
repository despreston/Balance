import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import actions from '../../actions/';
import { api } from '../../utils/api';
import s3upload from '../../utils/s3-upload';
import AddUpdate from './add-update';
import ImagePicker from 'react-native-image-picker';
import emptyNote from '../../utils/empty-note';

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

    this.state = {
      pictureUploadVisible: false,
      content: '',
      picture: null,
      complete: false
    };

    this.newPhoto = false;
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
    this.togglePhotoUploader = this.togglePhotoUploader.bind(this);
    this.removePhoto = this.removePhoto.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.isNew) {
      this.setState({
        content: nextProps.note.content,
        picture: nextProps.note.picture || null,
        complete: nextProps.note && nextProps.note.type === 'Past'
      });
    } else {
      this.reset();
    }

    this.newPhoto = false;
  }

  reset () {
    this.setState({
      content: '',
      picture: null,
      complete: false,
      pictureUploadVisible: false
    });
  }

  constructNoteObject () {
    let note;

    if (!this.props.isNew) {
      note = {
        _id: this.props.note._id,
        user: this.props.note.user,
        project: this.props.note.project,
      };

      note.type = this.state.complete ? 'Past' : 'Future';
    } else if (this.state.complete) {
      note = emptyNote(this.props.project, 'Past');
    } else {
      note = emptyNote(this.props.project, 'Future');
    }

    note.content = this.state.content;

    if (this.state.picture) {
      note.picture = this.state.picture;
    }

    return note;
  }

  /**
   * Save the notes as long as the content is not blank
   * @return {Promise}
   */
  save () {
    let note = this.constructNoteObject(note);
    let promises = [];

    return new Promise((resolve) => {
      // New photo needs to be uploaded to S3
      if (this.newPhoto) {
        const { picture } = note;
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
    }).then(() => this.props.hideFn());
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

  onPhotoSelect ({ uri: picture }) {
    this.newPhoto = true;
    this.setState({ picture });
  }

  removePhoto () {
    this.newPhoto = false;
    this.setState({ picture: null });
  }

  toggleComplete () {
    this.setState({ complete: !this.state.complete });
  }

  onContentChange (text) {
    this.setState({ content: text });
  }

  render () {
    const { hideFn, visible, project, isNew } = this.props;
    const { content, picture, complete } = this.state;

    return (
      <AddUpdate
        { ...{ hideFn, visible, project, isNew, content, picture, complete } }
        save={ this.save }
        remove={ this.remove }
        togglePhotoUploader={ this.togglePhotoUploader }
        removePhoto={ this.removePhoto }
        onContentChange={ this.onContentChange }
        toggleComplete={ this.toggleComplete }
      />
    );
  }

}

export default connect()(AddUpdateContainer);