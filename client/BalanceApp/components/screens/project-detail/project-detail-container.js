import React, { Component, PropTypes } from 'react';
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
    pastNotes: PropTypes.array,
    futureNotes: PropTypes.array,
    notes: PropTypes.array,
    userIsOwner: PropTypes.bool
  }

  static mapStateToProps (state, { navigation }) {
    let userIsOwner = false;
    const project = state.projects[navigation.state.params.project];
    const isType = (type, note) => note.type === type;
    const forProject = (project, note) => note.project._id === project;

    // notes for selected project
    const notes = Object.keys(state.notes)
      .map(id => state.notes[id])
      .filter(note => note.project._id === navigation.state.params.project);

    const pastNotes = Object.values(state.notes).filter(note => {
      return isType('Past', note) && forProject(project._id, note);
    });

    const futureNotes = Object.values(state.notes).filter(note => {
      return isType('Future', note) && forProject(project._id, note);
    });

    if (project) {
      // Logged-in user is the owner of the project
      userIsOwner = project.owner[0].userId === state.loggedInUser;
    }

    return { userIsOwner, project, notes, pastNotes, futureNotes };
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return { headerRight: headerRight({ ...state.params }) };
  }

  constructor (props) {
    super(props);

    this.state = {
      refreshing: false,
      addUpdateVisible: false,
      notesToShow: 'Future',
      updateDeckVisible: false,
      notes: Array.from(props.futureNotes)
    };

    this.toggleAddUpdateModal = this.toggleAddUpdateModal.bind(this);
    this.goToAuthor = this.goToAuthor.bind(this);
    this.onNoteContextChange = this.onNoteContextChange.bind(this);
    this.goToNote = this.goToNote.bind(this);
    this.toggleUpdateDeck = this.toggleUpdateDeck.bind(this);
    this.onUpdateDeckPress = this.onUpdateDeckPress.bind(this);
    this.showActionSheet = this.showActionSheet.bind(this);
    this.shareProject = this.shareProject.bind(this);
    this.nav = this.props.navigation.navigate;
  }

  componentDidMount () {
    this.load();
  }

  fetchNotes (project, type) {
    const query = [
      { user: project.owner[0].userId },
      { project: project._id },
      { type }
    ];

    return this.props.dispatch(actions.requestNotes(query));
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

    if (this.props.userIsOwner) {
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
    const message = this.props.userIsOwner
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
      userIsOwner: this.props.userIsOwner,
      onPress: this.showActionSheet
    });
  }

  async load () {
    const { project } = this.props.navigation.state.params;

    await this.props.dispatch(actions.fetchProject(project));
    await this.fetchNotes(this.props.project, this.state.notesToShow);
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

  goToAuthor () {
    this.nav('UserProfile', {
      userId: this.props.project.owner[0].userId
    });
  }

  goToNote (id) {
    this.nav('Note', { id });
  }

  async onNoteContextChange (type) {
    await this.fetchNotes(this.props.project, type);

    const notes = Array.from(
      type === 'Future' ? this.props.futureNotes : this.props.pastNotes
    );

    this.setState({
      notesToShow: type,
      notes
    });
  }

  render () {
    const {
      project,
      userIsOwner
    } = this.props;

    /**
     * project could be null if project is deleted, b/c of the way the
     * navigator works.
     */
    if (!project) { return null; }

    return (
      <ProjectDetail
        onRefresh={ () => this.refresh() }
        refreshing={ this.state.refreshing }
        project={ project }
        notes={ this.state.notes }
        userIsOwner={ userIsOwner }
        addUpdateVisible={ this.state.addUpdateVisible }
        onNoteContextChange={ this.onNoteContextChange }
        goToAuthor={ this.goToAuthor }
        goToNote={ this.goToNote }
        toggleAddUpdateModal={ this.toggleAddUpdateModal }
        updateDeckVisible={ this.state.updateDeckVisible }
        toggleUpdateDeck={ this.toggleUpdateDeck }
        onUpdateDeckPress={ this.onUpdateDeckPress }
      />
    );
  }
}

const headerRight = ({ project, userIsOwner, onPress }) => {
  if (userIsOwner === undefined) return null;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {
        !userIsOwner && <BookmarkButton project={ project } />
      }
      <MoreOptions onPress={ onPress }/>
    </View>
  );
}

export default connect(ProjectDetailContainer.mapStateToProps)(ProjectDetailContainer);
