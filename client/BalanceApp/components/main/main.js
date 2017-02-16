// Vendors
import React, { Component, PropTypes } from 'react';
import { Text, Button, View } from 'react-native';
import { connect } from 'react-redux';
import { get } from 'lodash';

// Components
import ProjectListContainer from '../project-list/project-list-container';
import NavBtn from '../navigation/nav-btn';
import Auth from '../auth/auth';
import Logout from '../auth/logout';

// styles
import { styles } from '../navigation/navigation-styles';

function mapStateToProps (state) {
  return {
    authenticated: state.authenticated
  }
}

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
    const { authenticated } = this.props;

    if (authenticated) {
      return (
        <View>
          <ProjectListContainer onProjectTap={this.openProject.bind(this)}/>
          <Logout />
        </View>
      );
    }

    /**
     * This could be expanded to include a message about logging in.
     * Show a message here when authenticated = false, then inside that message,
     * provide a button or link to open <Auth />
     */

    return <Auth />;
  }
}

export default connect(mapStateToProps)(MainScene);