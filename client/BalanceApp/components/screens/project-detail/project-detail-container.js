import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionSheetIOS, View } from 'react-native';
import ProjectDetail from './project-detail';
import actions from '../../../actions/';
import BookmarkButton from '../../bookmark-button/bookmark-button';
import MoreOptions from './more-options/more-options';

class ProjectDetailContainer extends Component {

  static propTypes = {
    project: PropTypes.shape({
      title: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired
    }),
    notes: PropTypes.array,
    bookmarks: PropTypes.array.isRequired
  }

  static mapStateToProps (state, { navigation }) {
    const projectId = navigation.state.params.project;
    const project = state.projects[projectId];

    const notes = Object.values(state.notes).filter(note => {
      return note.project._id === projectId;
    });

    const bookmarks = Object.values(state.bookmarks)
      .filter(bookmark => bookmark.project === projectId);

    return {
      project,
      bookmarks,
      notes,
      loggedInUser: state.loggedInUser
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;

    return {
      headerRight: headerRight({ ...state.params }),
      headerStyle: {
        backgroundColor: '#432B52',
        borderBottomWidth: 0
      },
      headerTintColor: '#ffffff'
    };
  }

  constructor (props) {
    super(props);

    this.state = {
      refreshing: false,
      addUpdateVisible: false,
      notesToShow: 'Future',
      updateDeckVisible: false
    };

    this.userIsOwner = this.isOwner();

    this.toggleAddUpdateModal = this.toggleAddUpdateModal.bind(this);
    this.onNoteContextChange = this.onNoteContextChange.bind(this);
    this.goToNote = this.goToNote.bind(this);
    this.toggleUpdateDeck = this.toggleUpdateDeck.bind(this);
    this.onUpdateDeckPress = this.onUpdateDeckPress.bind(this);
    this.showActionSheet = this.showActionSheet.bind(this);
    this.shareProject = this.shareProject.bind(this);
    this.goToBookmarks = this.goToBookmarks.bind(this);
    this.nav = this.props.navigation.navigate;
  }

  componentDidMount () {
    this.load();
  }

  componentWillReceiveProps () {
    this.userIsOwner = this.isOwner();
  }

  isOwner () {
    return !!this.props.project &&
      this.props.project.owner[0].userId === this.props.loggedInUser;
  }

  fetchNotes (project, type) {
    const query = [
      { user: project.owner[0].userId },
      { project: project._id },
      { type }
    ];

    return this.props.dispatch(actions.requestNotes(query));
  }

  fetchBookmarks (id) {
    return this.props.dispatch(actions.bookmarksForProject(id));
  }

  actionSheetOptions () {
    let options = [
      {
        label: 'View as Slideshow',
        fn: this.toggleUpdateDeck
      },
      {
        label: 'Share via...',
        fn: this.shareProject
      },
      {
        label: 'Cancel',
        fn: () => null
      }
    ];

    if (this.userIsOwner) {
      const editProject = {
        label: 'Edit Project',
        fn: () => {
          this.props.navigation.navigate('EditProject', {
            project: this.props.project._id
          });
        }
      };

      options.splice(2, 0, editProject);
    }

    return options;
  }

  showActionSheet () {
    const options = this.actionSheetOptions();

    ActionSheetIOS.showActionSheetWithOptions({
      options: options.map(option => option.label),
      cancelButtonIndex: options.length - 1
    }, selectedButtonIndex => options[selectedButtonIndex].fn() );
  }

  shareProject () {
    const message = this.userIsOwner
      ? `I'm using Balance (getbalanceapp.com) to track my project, "${this.props.project.title}". Check it out!`
      : `Check out "${this.props.project.title}" on Balance (getbalanceapp.com)`;

    const options = {
      url: `${CONFIG.widgetsUrl}large/${this.props.project._id}`,
      message
    };

    ActionSheetIOS.showShareActionSheetWithOptions(
      options,
      () => null, // error
      () => null // success
    );
  }

  componentWillMount () {
    this.props.navigation.setParams({
      userIsOwner: this.userIsOwner,
      onPress: this.showActionSheet
    });
  }

  async load () {
    const { project } = this.props.navigation.state.params;

    await this.props.dispatch(actions.fetchProject(project));
    await this.fetchNotes(this.props.project, this.state.notesToShow);
    await this.fetchBookmarks(this.props.project._id);
  }

  refresh () {
    this.setState({ refreshing: true });
    this.load().then(() => this.setState({ refreshing: false }));
  }

  onUpdateDeckPress (note) {
    this.toggleUpdateDeck();
    this.goToNote(note);
  }

  toggleAddUpdateModal () {
    this.setState({ addUpdateVisible: !this.state.addUpdateVisible });
  }

  toggleUpdateDeck () {
    this.setState({ updateDeckVisible: !this.state.updateDeckVisible });
  }

  goToUser (userId) {
    this.nav('UserProfile', { userId });
  }

  goToBookmarks () {
    this.nav('ProjectBookmarks', {
      bookmarks: this.props.bookmarks,
      onUserSelect: userId => this.goToUser(userId)
    });
  }

  goToNote (id) {
    this.nav('Note', { id });
  }

  async onNoteContextChange (type) {
    await this.fetchNotes(this.props.project, type);

    this.setState({ notesToShow: type });
  }

  render () {
    /**
     * project could be null if project is deleted, b/c of the way the
     * navigator works.
    */
    if (!this.props.project) {
      return null;
    }

    return (
      <ProjectDetail
        onBookmarksTap={ this.goToBookmarks }
        onRefresh={ () => this.refresh() }
        refreshing={ this.state.refreshing }
        bookmarkCount={ this.props.bookmarks.length }
        project={ this.props.project }
        notes={ this.props.notes }
        userIsOwner={ this.userIsOwner }
        addUpdateVisible={ this.state.addUpdateVisible }
        onNoteContextChange={ this.onNoteContextChange }
        goToAuthor={ () => this.goToUser(this.props.project.owner[0].userId) }
        goToNote={ this.goToNote }
        toggleAddUpdateModal={ this.toggleAddUpdateModal }
        updateDeckVisible={ this.state.updateDeckVisible }
        toggleUpdateDeck={ this.toggleUpdateDeck }
        onUpdateDeckPress={ this.onUpdateDeckPress }
        noteType={ this.state.notesToShow }
      />
    );
  }
}

const headerRight = ({ project, userIsOwner, onPress }) => {
  if (userIsOwner === undefined) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {
        !userIsOwner && (
          <BookmarkButton project={ project } />
        )
      }
      <MoreOptions onPress={ onPress }/>
    </View>
  );
}

export default connect(ProjectDetailContainer.mapStateToProps)(ProjectDetailContainer);
