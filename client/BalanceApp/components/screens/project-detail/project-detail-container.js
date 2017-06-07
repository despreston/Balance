import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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
    let userIsOwner;
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
      headerRight: headerRight(navigate, state.params.showEdit, state.params.project)
    };
  }

  constructor (props) {
    super(props);

    this.state = {
      refreshing: false,
      addUpdateVisible: false,
      notesToShow: 'Future'
    };

    this.toggleAddUpdateModal = this.toggleAddUpdateModal.bind(this);
    this.goToAuthor = this.goToAuthor.bind(this);
    this.onNoteContextChange = this.onNoteContextChange.bind(this);
    this.goToNote = this.goToNote.bind(this);
    this.nav = this.props.navigation.navigate;
  }

  componentDidMount () {
    this.load();
  }

  componentWillMount () {
    this.props.navigation.setParams({ showEdit: !!this.props.userIsOwner });
  }

  load () {
    const { project } = this.props.navigation.state.params;
    return this.props.dispatch(actions.fetchProject(project));
  }

  refresh () {
    this.setState({ refreshing: true });
    this.load().then(() => this.setState({ refreshing: false }));
  }

  toggleAddUpdateModal () {
    this.setState({ addUpdateVisible: !this.state.addUpdateVisible });
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
      />
    );
  }
}

const headerRight = (navigate, showEdit, project) => {
  if (showEdit) {
    return (
      <Icon
        imagePath={ require('../../../assets/icons/settings.png') }
        onPress={ () => {
          navigate('EditProject', { project })
        }}
      />
    );
  } else if (showEdit === false) {
    return <BookmarkButton project={ project } />;
  }
  return null;
};

export default connect(ProjectDetailContainer.mapStateToProps)(ProjectDetailContainer);