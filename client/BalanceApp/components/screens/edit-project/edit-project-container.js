import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import actions from '../../../actions/';
import EditProject from './edit-project';
import NavBtn from '../../navigation/nav-btn';
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

  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    const title = state.params && state.params.project
      ? 'Edit Project'
      : 'New Project';

    const headerLeft = <NavBtn title='Cancel' onPress={ () => goBack() } />;

    const headerRight = (
      <NavBtn
        disabled={ !state.params || state.params && state.params.disable }
        title='Save'
        onPress={ () => state.params.saveProject() }
      />
    );

    return { title, headerLeft, headerRight };
  };

  constructor (props) {
    super();
    this.state = { project: props.project };
    this.navToCategories = this.navToCategories.bind(this);
    this.onProjectEdit = this.onProjectEdit.bind(this);
  }

  componentWillMount () {
    this.props.navigation.setParams({
      disable: true,
      saveProject: () => this.saveProject()
    });
  }

  valid () {
    const { project } = this.state;

    const rules = {
      titleRequired () { return project.title && project.title !== '' }
    };

    return Object.keys(rules).every(rule => rules[rule]());
  }

  onProjectEdit (property, value) {
    this.setState({
      project: {
        ...this.state.project,
        [property]: value
      }
    }, () => {
      this.props.navigation.setParams({ disable: !this.valid() })
    });
  }

  navToCategories () {
    this.props.navigation.navigate('ProjectCategory', {
      selectCategory: category => this.onProjectEdit('category', category)
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
      ],
      key: 'Home'
    });

    this.props.navigation.dispatch(resetAction);

    setTimeout(() => {
      this.props.dispatch(actions.deleteProject(this.state.project._id));
    }, 1000);
  }

  render () {
    return (
      <EditProject
        navToCategories={ this.navToCategories }
        project={ this.state.project }
        onEdit={ this.onProjectEdit }
        onRemove={ this.delete } />
    );
  }
}

export default connect(EditProjectContainer.mapStateToProps)(EditProjectContainer);
