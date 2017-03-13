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
import { requestUser } from '../../../actions';

function mapStateToProps (state) {
  return {
    loggedInUser: state.users[state.loggedInUser]
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCurrentUser: (userId) => dispatch(requestUser(userId, true))
  };
}

class MainScene extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    fetchCurrentUser: PropTypes.func.isRequired,
    loggedInUser: PropTypes.object
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

    this.state = { loading: true, isMounted: false };
    this.navigate = this.props.navigation.navigate;
  }

  componentWillReceiveProps (nextProps) {
    const { loggedInUser } = nextProps;

    isLoggedIn().then(authenticated => {
      if (authenticated) {
        parseToken().then(token => {
          if (!loggedInUser || token.sub !== loggedInUser.userId) {
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
    const { loggedInUser } = this.props;

    if (loggedInUser) {
      return (
          <ProjectListContainer
            onProjectTap={this.openProject.bind(this)}
            user={loggedInUser.userId}
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