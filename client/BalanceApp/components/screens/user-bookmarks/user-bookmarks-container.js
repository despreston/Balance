import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { api } from '../../../utils/api';
import ProjectList from '../../project-list/project-list';
import actions from '../../../actions';

class UserBookmarksContainer extends Component {

  static mapStateToProps (state) {

    return {
      loggedInUser: state.loggedInUser
    };
  }

  static propTypes = {
    loggedInUser: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props);
    this.state = { projects: [], refreshing: false };
    this.load();
    this.load = this.load.bind(this);
    this.onProjectTap = this.onProjectTap.bind(this);
  }

  load () {
    const { user } = this.props.navigation.state.params;

    api(`users/${user}/bookmarks`).then(projects => {
      this.props.dispatch(actions.receiveBookmarks(projects));
      this.setState({ projects });
    });
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
