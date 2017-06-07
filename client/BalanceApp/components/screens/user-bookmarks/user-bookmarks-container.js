import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { api } from '../../../utils/api';
import ProjectList from '../../project-list/project-list';

class UserBookmarksContainer extends Component {

  static mapStateToProps (state) {
    return { user: state.loggedInUser };
  }

  static propTypes = {
    user: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props);
    this.state = { projects: [], refreshing: false };
    this.load();
    this.load = this.load.bind(this);
    this.onProjectTap = this.onProjectTap.bind(this);
  }

  load () {
    api(`users/${this.props.user}/bookmarks`).then(projects => {
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
        loggedInUser={ this.props.user }
        refreshing={ this.state.refreshing }
        onRefresh={ () => null }
      />
    )
  }

}

export default connect(UserBookmarksContainer.mapStateToProps)(UserBookmarksContainer);