// Vendors
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Components
import ProjectDetail from './project-detail';
import Icon from '../../navigation/icon';

// actions
import actions from '../../../actions/';

class ProjectDetailContainer extends Component {

  static propTypes = {
    project: PropTypes.shape({
      title: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired
    }),
    notes: PropTypes.array,
    userIsOwner: PropTypes.bool
  };

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
    let headerRight = null;

    if (state.params.showEdit) {
      headerRight = (
        <Icon
          imagePath={ require('../../../assets/icons/edit-white.png') }
          onPress={ () => {
            navigate('EditProject', { project: state.params.project })
          }}
        />
      );
    }

    return { headerRight };
  };

  constructor (props) {
    super(props);
    this.state = { refreshing: false };
  }

  componentWillMount () {
    this.props.navigation.setParams({ showEdit: this.props.userIsOwner });
  }

  refresh () {
    this.setState({ refreshing: true });

    this.props.dispatch(actions.fetchProject(this.props.project))
      .then(() => this.setState({ refreshing: false }));
  }

  render () {
    const {
      project,
      notes,
      navigation: { navigate: nav },
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
        nav={ nav }
        project={ project }
        notes={ notes }
        userIsOwner={ userIsOwner }
      />
    );
  }

}

export default connect(ProjectDetailContainer.mapStateToProps)(ProjectDetailContainer);