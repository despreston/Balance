// Vendors
import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';

// Components
import ProjectListContainer from '../../project-list/project-list-container';
import NavBtn from '../../navigation/nav-btn';

import MainStyle from './main-styles';

class MainScene extends Component {

  static propTypes = {
    loggedInUser: PropTypes.string.isRequired
  };

  static mapStateToProps ({ loggedInUser }) {
    return { loggedInUser };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Projects',
      headerRight: (
        <NavBtn
          onPress={() => navigation.navigate('EditProject')}
          title="✚"
        />
      )
    };
  };

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
      <Text style={ MainStyle.text }>Nothing started yet 😐</Text>
      <TouchableOpacity onPress={ start } style={ MainStyle.start }>
        <Text style={ MainStyle.buttonText }>Start a project</Text>
      </TouchableOpacity>
    </View>
  )
};

export default connect(MainScene.mapStateToProps)(MainScene);