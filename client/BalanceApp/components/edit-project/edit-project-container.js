// vendors
import React, { Component, PropTypes } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';

// styles
import { styles as NavStyles } from '../navigation/navigation-styles';

// actions
import { saveProject, deleteProject } from '../../actions';

// components
import EditProject from './edit-project';
import NavBtn from '../navigation/nav-btn';

// utils
import emptyProject from '../../utils/empty-project';

function mapStateToProps (state, { navigation }) {
  let project;

  if (navigation.state.params && navigation.state.params.project) {
    project = state.projects[navigation.state.params.project];
  } else {
    project = emptyProject(state.current_user);
  }

  return { project };
}

function mapDispatchToProps (dispatch) {
  return {
    deleteProject: project => dispatch(deleteProject(project)),
    updateProject: project => dispatch(saveProject(project))
  };
}

class EditProjectContainer extends Component {

  static propTypes = {
    project: PropTypes.object,
    updateProject: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired
  };

  static navigationOptions = {
    header: ({ goBack, dispatch, state, navigate }, defaultHeader) => {

      const title = state.params && state.params.project
        ? 'Edit Project'
        : 'New Project';

      const tintColor = '#FFFFFF';

      const left = (
        <NavBtn
          title='Cancel'
          onPress={() => goBack()}
        />
      );

      const right = (
        <NavBtn
          title='Save'
          onPress={() => state.params.saveProject()}
        />
      );

      return { ...defaultHeader, left, right, title, tintColor };
    }
  };
  
  
  constructor (props) {
    super();

    this.state = {
      project: props.project,
      invalid: false
    };
  }

  componentDidMount () {
    setTimeout(() => this.props.navigation.setParams({
      saveProject: () => this.saveProject()
    }), 500);
  }

  onProjectEdit = (property, value) => {
    this.setState({ 
      project: {
        ...this.state.project,
        [property]: value 
      }
    });
  }

  // Handle any form validation before saving
  saveProject () {
    // Empty project title
    if (!this.state.project.title || this.state.project.title === '') {
      this.setState({ invalid: true });
      return;
    }

    this.props.updateProject(this.state.project).then(() => {
      this.props.navigation.goBack();
    });
  }

  delete = () => {
    this.props.navigation.navigate('Home');
    this.props.deleteProject(this.state.project._id);
  }

  render () {
    let { project } = this.state;

    return (
      <EditProject
        project={project}
        onEdit={this.onProjectEdit}
        onRemove={this.delete} />
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectContainer);