import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import ProjectDetail from './project-detail';
import Icon from '../../navigation/icon';
import actions from '../../../actions/';
import BookmarkButton from '../../bookmark-button/bookmark-button';

class ProjectDetailContainer extends Component {

  static propTypes = {
    project: PropTypes.shape({
      title: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired
    }),
    notes: PropTypes.array,
    userIsOwner: PropTypes.bool
  }

  static mapStateToProps (state, { navigation }) {
    let userIsOwner = false;
    const project = state.projects[navigation.state.params.project];

    // notes for selected project
    const notes = Object.keys(state.notes)
      .map(id => state.notes[id])
      .filter(note => note.project._id === navigation.state.params.project);

    if (project) {
      // Logged-in user is the owner of the project
      userIsOwner = project.owner[0].userId === state.loggedInUser;
    }

    return { userIsOwner, project, notes };
  }

  static navigationOptions = ({ navigation }) => {
    const { state, navigate } = navigation;

    return {
      headerRight: headerRight(navigate, state.params.showEdit, state.params.project, state.params.showUpdateDeck)
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

    this.toggleAddUpdateModal = this.toggleAddUpdateModal.bind(this);
    this.goToAuthor = this.goToAuthor.bind(this);
    this.onNoteContextChange = this.onNoteContextChange.bind(this);
    this.goToNote = this.goToNote.bind(this);
    this.toggleUpdateDeck = this.toggleUpdateDeck.bind(this);
    this.onUpdateDeckPress = this.onUpdateDeckPress.bind(this);
    this.nav = this.props.navigation.navigate;
  }

  componentDidMount () {
    this.load();
  }

  componentWillMount () {
    this.props.navigation.setParams({
      showEdit: !!this.props.userIsOwner,
      showUpdateDeck: this.toggleUpdateDeck
    });
  }

  load () {
    const { project } = this.props.navigation.state.params;
    return this.props.dispatch(actions.fetchProject(project));
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

  onNoteContextChange (type) {
    this.setState({ notesToShow: type });
  }

  render () {
    const {
      project,
      notes,
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
        notes={ notes }
        userIsOwner={ userIsOwner }
        notesToShow={ this.state.notesToShow }
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

const headerRight = (navigate, showEdit, project, showUpdateDeck) => {
  // navigation is still loading. dont show anything
  if (!showEdit && showEdit !== false) return null;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {
        showEdit &&
        <Icon
          imagePath={ require('../../../assets/icons/settings.png') }
          onPress={ () => navigate('EditProject', { project }) }
        />
      }
      {
        !showEdit && <BookmarkButton project={ project } />
      }
      <Icon
        imagePath={ require('../../../assets/icons/photo-stack.png') }
        onPress={ showUpdateDeck }
      />
    </View>
  );
};

export default connect(ProjectDetailContainer.mapStateToProps)(ProjectDetailContainer);