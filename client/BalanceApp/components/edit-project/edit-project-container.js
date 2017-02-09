// vendors
import React, { Component, PropTypes } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';

// styles
import { styles as NavStyles } from '../navigation/navigation-styles';

// actions
import { saveProject } from '../../actions';

// components
import EditProject from './edit-project';

function mapStateToProps (state, { navigation }) {
  return {
    project: state.projects[navigation.state.params.project]
  };
}

function mapDispatchToProps (dispatch) {
  return {
    updateProject: project => dispatch(saveProject(project))
  };
}

class EditProjectContainer extends Component {

  static propTypes = {
    project: PropTypes.object.isRequired,
    updateProject: PropTypes.func.isRequired
  };

  static navigationOptions = {
    header: ({ goBack, dispatch, state, navigate }) => {
      const style = { backgroundColor: '#333' };

      const title = 'Edit Project';

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

  render () {
    let project = this.state.project;
    return <EditProject project={project} onEdit={this.onProjectEdit}/>;
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectContainer);