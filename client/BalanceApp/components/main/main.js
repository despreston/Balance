// Vendors
import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, Text } from 'react-native';

// Components
import ProjectListContainer from '../project-list/project-list-container';
import { styles } from './navigation-styles';

export default class MainScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  }

  constructor (props) {
    super();
  }

  projectDetailLeftButton (pop) {
    return (
      <TouchableHighlight onPress={pop}>
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