// Vendors
import React, { Component, PropTypes } from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { get } from 'lodash';

// Components
import ProjectListContainer from '../../project-list/project-list-container';
import NavBtn from '../../navigation/nav-btn';
import SignOn from '../../signon/signon';

// styles
import { styles } from '../../navigation/navigation-styles';

// utils
import { isLoggedIn, parseToken } from '../../../utils/auth';

// actions
import { fetchProjects, fetchUser } from '../../../actions';

function mapStateToProps (state) {
  return {
    current_user: state.current_user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCurrentUser: (userId) => dispatch(fetchUser(userId, true)),
    fetchProjects: (userId) => dispatch(fetchProjects(userId))
  };
}

class MainScene extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    fetchProjects: PropTypes.func.isRequired,
    fetchCurrentUser: PropTypes.func.isRequired
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

    this.state = { loading: true, currentUser: null, isMounted: false };
    this.navigate = this.props.navigation.navigate;
  }

  componentWillReceiveProps (nextProps) {
    isLoggedIn().then(authenticated => {
      if (authenticated) {
        parseToken().then(token => {
          if (token.sub !== this.props.current_user) {
            this.props.fetchCurrentUser(token.sub).then(() =>{
              this.setState({ loading: false });
            });
          }
        });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  componentDidMount () {
    this.setState({ isMounted: true });

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
      if (this.props.current_user) {
        return (
            <ProjectListContainer
              onProjectTap={this.openProject.bind(this)}
              user={this.props.current_user}
            />
        );
      }
      /**
       * This could be expanded to include a message about logging in.
       */
      if (!this.state.loading) {
        return <SignOn />
      }

      return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScene);