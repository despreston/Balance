// vendors
import React, { Component, PropTypes } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

// styles
import { styles as NavStyles } from '../navigation/navigation-styles';

// actions
import { saveProject, deleteProject } from '../../actions';

// components
import EditProject from './edit-project';

// utils
import emptyProject from '../../utils/empty-project';

function mapStateToProps (state, { navigation }) {
  let project;

  if (navigation.state.params && navigation.state.params.project) {
    project = state.projects[navigation.state.params.project];
  }
  else {
    project = emptyProject();
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
    project: PropTypes.object.isRequired,
    updateProject: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired
  };

  static navigationOptions = {
    header: ({ goBack, dispatch, state, navigate }) => {
      const style = { backgroundColor: '#333' };

      const title = state.params && state.params.project ? 'Edit Project' : 'New Project';

      const tintColor = '#FFFFFF';

      const left = (
        <Button
          color='#FFFFFF'
          style={[NavStyles.button, NavStyles.text, { fontWeight: 'normal' }]}
          title='Cancel'
          onPress={() => goBack()}
        />
      );

      const right = (
        <Button
          color='#FFFFFF'
          style={[NavStyles.button, NavStyles.text, { fontWeight: 'normal' }]}
          title='Save'
          onPress={() => state.params.saveProject()}
        />
      );

      return { style, left, right, title, tintColor };
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
    // const resetAndNavigate = NavigationActions.reset({
    //   index: 1,
    //   actions: [
    //     NavigationActions.navigate({ routeName: 'ProjectDetail' }),
    //     NavigationActions.navigate({ routeName: 'Home' })
    //   ]
    // });

    // this.props.navigation.dispatch(resetAndNavigate);
    // this.props.navigation.navigate('Home');
    this.props.navigation.goBack('ProjectDetail');
    this.props.deleteProject(this.state.project._id);
  }

  render () {
    let project = this.state.project;

    return <EditProject project={project} onEdit={this.onProjectEdit} onRemove={this.delete} />;
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectContainer);