// Vendors
import React, { Component, PropTypes } from 'react';
import { Text, Button, View } from 'react-native';
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
import { setCurrentUser, fetchProjects, fetchUser } from '../../../actions';

function mapStateToProps (state) {
  return {
    current_user: state.current_user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchUser: (id) => dispatch(fetchUser(id)),
    setUser: (id) => dispatch(setCurrentUser(id)),
    fetchProjects: (userId) => dispatch(fetchProjects(userId))
  };
}

class MainScene extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired
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

    this.state = { loading: true, authenticated: false };
    this.navigate = this.props.navigation.navigate;
    this._mounted = false;
  }

  componentWillReceiveProps () {
    this.setState({ loading: true });

    isLoggedIn().then(authenticated => {
      if (authenticated) {
        parseToken().then(token => {
          if (token.sub !== this.props.current_user) {
            this.props.setUser(token.sub);
            this.props.fetchUser(token.sub);
          }
          if (this._mounted) {
            this.setState({ loading: false, authenticated });
          }
        });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  componentDidMount () {
    this._mounted = true;
    this.props.navigation.setParams({
      newProject: this.newProject.bind(this)
    });
  }

  componentWillUnmount () {
    this._mounted = false;
  }

  openProject (project) {
    const id = get(project, '_id');
    this.navigate('Project', { project: id });
  }

  newProject () {
    this.navigate('EditProject');
  }

  render () {
    if (!this.state.loading) {
      if (this.state.authenticated && this.props.current_user) {
        return (
            <ProjectListContainer
              onProjectTap={this.openProject.bind(this)}
              user={this.props.current_user}
            />
        );
      }
      /**
       * This could be expanded to include a message about logging in.
       * Show a message here when authenticated = false, then inside that message,
       * provide a button or link to open <Auth />
       */

      return <SignOn />;
    }

    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScene);