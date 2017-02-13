// Vendors
import React, { Component, PropTypes } from 'react';
import { Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { get } from 'lodash';

// Components
import ProjectListContainer from '../project-list/project-list-container';
import NavBtn from '../navigation/nav-btn';

// styles
import { styles } from '../navigation/navigation-styles';

class MainScene extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  static navigationOptions = {
    header: ({ state, navigate, dispatch }, defaultHeader) => ({
      ...defaultHeader,
      title: <Text style={[styles.text, styles.title, styles.mainTitle]}>BALANCE</Text>,
      left: (
        <NavBtn
          title="!?"
          onPress={() => null}
        />
      ),
      right: (
        <NavBtn
          onPress={() => state.params.newProject()}
          title="✚"
        />
      )
    })
  };

  constructor (props) {
    super(props);

    this.navigate = this.props.navigation.navigate;
  }

  componentDidMount () {
    this.props.navigation.setParams({
      newProject: this.newProject.bind(this)
    });
  }

  openProject (project) {
    const id = get(project, '_id');
    this.navigate('Project', { project: id });
  }

  newProject () {
    this.navigate('EditProject');
  }

  render () {
    return <ProjectListContainer onProjectTap={this.openProject.bind(this)}/>;
  }
}

export default connect()(MainScene);