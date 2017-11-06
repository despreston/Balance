import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { connect }                      from 'react-redux';
import ProjectListContainer             from '../../project-list/project-list-container';
import NavBtn                           from '../../navigation/nav-btn';
import MainStyle                        from './main-styles';

class MainScene extends Component {

  static propTypes = {
    loggedInUser: PropTypes.string.isRequired
  }

  static mapStateToProps ({ loggedInUser }) {
    return { loggedInUser };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerBackTitle: null,
      title: 'Projects',
      headerRight: (
        <NavBtn
          onPress={() => navigation.navigate('EditProject')}
          title='New'
        />
      )
    };
  }

  constructor (props) {
    super(props);
    this.state = { helpVisible: false };
    this.nav = this.props.navigation.navigate;
  }

  openProject (project) {
    this.nav('Project', { project: project._id });
  }

  newProject () {
    this.nav('EditProject');
  }

  render () {
    return (
      <ProjectListContainer
        emptyState={ <EmptyState start={() => this.newProject() }/> }
        showFilter
        onProjectTap={ this.openProject.bind(this) }
        user={ this.props.loggedInUser }
      />
    );
  }
}

const EmptyState = ({ start }) => {
  return (
    <View style={ MainStyle.center }>
      <Text style={ MainStyle.text }>
        Track your hobby, class, DIY project, daily habits, and more.
      </Text>
      <TouchableOpacity onPress={ start } style={ MainStyle.start }>
        <Text style={ MainStyle.buttonText }>Start a project</Text>
      </TouchableOpacity>
    </View>
  )
};

export default connect(MainScene.mapStateToProps)(MainScene);
