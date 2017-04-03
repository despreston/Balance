// Vendors
import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

// Components
import ProjectListContainer from '../../project-list/project-list-container';
import NavBtn from '../../navigation/nav-btn';

// styles
import { styles } from '../../navigation/navigation-styles';


function mapStateToProps (state) {
  return {
    loggedInUser: state.loggedInUser
  }
}

class MainScene extends Component {
  static propTypes = {
    loggedInUser: PropTypes.string.isRequired
  };

  static navigationOptions = {
    header: ({ state, navigate, dispatch }, defaultHeader) => ({
      
      ...defaultHeader,
      
      title: <Text style={[ styles.text, styles.title ]}>Projects</Text>,
      
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

    this.nav = this.props.navigation.navigate;
  }

  componentDidMount () {
    this.props.navigation.setParams({
      newProject: this.newProject.bind(this)
    });
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
          onProjectTap={ this.openProject.bind(this) }
          user={ this.props.loggedInUser }
        />
    );
  }
}

export default connect(mapStateToProps)(MainScene);