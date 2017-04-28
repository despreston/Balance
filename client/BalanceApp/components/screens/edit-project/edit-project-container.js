// vendors
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'

// actions
import actions from '../../../actions/';

// components
import EditProject from './edit-project';
import NavBtn from '../../navigation/nav-btn';

// utils
import emptyProject from '../../../utils/empty-project';

class EditProjectContainer extends Component {

  static propTypes = {
    project: PropTypes.object
  };

  static mapStateToProps (state, { navigation }) {
    let project;

    if (navigation.state.params && navigation.state.params.project) {
      project = state.projects[navigation.state.params.project];
    } else {
      project = emptyProject(state.loggedInUser);
    }

    return { project };
  }

  static navigationOptions = {
    header: ({ goBack, state }, defaultHeader) => {

      const title = state.params && state.params.project
        ? 'Edit Project'
        : 'New Project';

      const left = ( <NavBtn title='Cancel' onPress={ () => goBack() } /> );

      const right = (
        <NavBtn title='Save' onPress={ () => state.params.saveProject() } />
      );

      return { ...defaultHeader, left, right, title };
    }
  };
  
  constructor (props) {
    super();

    this.state = { project: props.project };
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

  // Handles any form validation before saving
  saveProject () {

    // Empty project title
    if (!this.state.project.title || this.state.project.title === '') {
      return;
    }

    this.props.dispatch(actions.saveProject(this.state.project))
    .then(() => this.props.navigation.goBack());

  }

  delete = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' })
      ]
    });

    this.props.navigation.dispatch(resetAction);

    setTimeout(() => {
      this.props.dispatch(actions.deleteProject(this.state.project._id));
    }, 2000);
  }

  render () {
    return (
      <EditProject
        project={ this.state.project }
        onEdit={ this.onProjectEdit }
        onRemove={ this.delete } />
    );
  }

}

export default connect(
  EditProjectContainer.mapStateToProps
)(EditProjectContainer);