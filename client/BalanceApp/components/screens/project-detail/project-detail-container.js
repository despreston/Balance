// Vendors
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Components
import ProjectDetail from './project-detail';
import Icon from '../../navigation/icon';

// actions
import { requestNotes } from '../../../actions';

function mapStateToProps (state, { navigation }) {

  const project = state.projects[navigation.state.params.project];

  // notes for selected project
  const notes = Object.keys(state.notes)
    .map(id => state.notes[id])
    .filter(note => note.project._id === navigation.state.params.project);

  // Logged-in user is the owner of the project
  const userIsOwner = project.owner[0].userId === state.loggedInUser;

  return { userIsOwner, project, notes };

}

const mapDispatchToProps = { requestNotes };

class ProjectDetailContainer extends Component {

  static propTypes = {
    project: PropTypes.shape({
      title: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired
    }),
    notes: PropTypes.array,
    requestNotes: PropTypes.func.isRequired,
    userIsOwner: PropTypes.bool
  };

  static navigationOptions = {
    header: ({ state, navigate }, defaultHeader) => {
      let right = null;

      if (state.params.showEdit) {
        right = (
          <Icon
            imagePath={ require('../../../assets/icons/edit-white.png') }
            onPress={ () => {
              navigate('EditProject', { project: state.params.project })
            }}
          />
        );
      }

      return { ...defaultHeader, right };
    }
  };

  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.navigation.setParams({ showEdit: this.props.userIsOwner });
  }

  componentDidMount () {
    if (this.props.project._id) {
      this.props.requestNotes([
        { project: this.props.project._id },
        { type: 'Past' }
      ]);
    }
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
        nav={ nav }
        project={ project }
        notes={ notes }
        userIsOwner={ userIsOwner }
      />
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailContainer);