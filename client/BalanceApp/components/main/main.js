// Vendors
import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';

// Components
import ProjectListContainer from '../project-list/project-list-container';
import { styles } from './navigation-styles';
import { fetchProjects } from '../../actions';

class MainScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
  }

  projectDetailLeftButton (pop) {
    function onPress () {
      this.props.dispatch(fetchProjects());
      pop();
    }
    return (
      <TouchableHighlight onPress={onPress.bind(this)}>
        <Text style={[styles.button, styles.text, { fontWeight: 'normal' } ]}>Back</Text>
      </TouchableHighlight>
    );
  }

  projectDetailTitle () {
    return (<Text style={ [styles.title, styles.text, { letterSpacing: 1 }] }>Details</Text>)
  }

  onProjectTap (project) {
    this.props.navigator.push({
      title: project.title,
      scene: 'project-detail',
      leftButton: this.projectDetailLeftButton(this.props.navigator.pop),
      rightButton: () => null,
      renderTitle: this.projectDetailTitle(),
      passProps: { projectId: project._id }
    });
  }

  render () {
    return <ProjectListContainer onProjectTap={this.onProjectTap.bind(this)}/>;
  }
}

export default connect()(MainScene);