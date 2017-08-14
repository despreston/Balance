import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { api } from '../../../utils/api';
import ProjectList from '../../project-list/project-list';
import actions from '../../../actions';

class UserBookmarksContainer extends Component {

  static mapStateToProps ({ loggedInUser }) {
    return { loggedInUser };
  }

  static propTypes = {
    loggedInUser: PropTypes.string.isRequired
  }

  static navigationOptions = () => ({ title: 'Bookmarks' })

  constructor (props) {
    super(props);
    this.state = { projects: [], refreshing: false };
    this.load();
    this.load = this.load.bind(this);
    this.onProjectTap = this.onProjectTap.bind(this);
  }

  async load () {
    const { user } = this.props.navigation.state.params;
    const projects = await api(`users/${user}/bookmarks`);

    this.props.dispatch(actions.receiveBookmarks(projects));
    this.setState({ projects });
  }

  onProjectTap (project) {
    this.props.navigation.navigate('Project', { project: project._id });
  }

  render () {
    if (this.state.projects.length < 1) return null;
    return (
      <ProjectList
        onProjectTap={ this.onProjectTap }
        projects={ this.state.projects }
        loggedInUser={ this.props.loggedInUser }
        refreshing={ this.state.refreshing }
        onRefresh={ () => null }
      />
    )
  }

}

export default connect(UserBookmarksContainer.mapStateToProps)(UserBookmarksContainer);
