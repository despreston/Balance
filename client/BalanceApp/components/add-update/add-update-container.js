import React, { Component, PropTypes } from 'react'
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import actions from '../../actions/';
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
    note: PropTypes.object,
    nav: PropTypes.object
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
        project: this.props.note.project
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

    return new Promise((resolve) => {
      // New photo needs to be uploaded to S3
      if (this.newPhoto) {
        return s3upload(note.picture).then(url => {
          note.picture = url;
          return resolve();
        });
      }
      
      return resolve();
    })
    .then(() => {
      this.props.hideFn();
      this.newPhoto = false;
      const { dispatch } = this.props;

      return dispatch(actions.saveNote(note))
      .then(() => {
        // force reload of project
        if (this.props.reloadProject) {
          dispatch(actions.fetchProject(this.props.project._id));
        }

        // Picture needs to be deleted
        if (this.props.note && this.props.note.picture && !note.picture) {
          dispatch(actions.deletePictureFromNote(note._id));
        }
      });
    });
  }

  remove () {
    // For now, you can only edit an existing note through the Note screen.
    // In other add-update-container locations, the nav prop is not required b/c
    // the delete button is not shown.
    // if this changes, navigation will have to passed to this component
    if (!this.props.nav) return;

    const backAction = NavigationActions.back();

    this.props.nav.dispatch(backAction);
    this.props.hideFn();

    setTimeout(() => {
      this.props.dispatch(actions.deleteNote(this.props.note._id));
    }, 1000);
  }

  togglePhotoUploader () {
    const options = {
      title: null,
      noData: true,
      mediaType: 'photo',
      storageOptions: {
        waitUntilSaved: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (!response.didCancel && !response.error) {
        let source = { uri: response.uri };
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