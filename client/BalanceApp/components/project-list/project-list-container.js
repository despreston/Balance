// Vendors
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Components
import ProjectList from './project-list';
import { fetchProjectsForUser } from '../../actions';

class ProjectListContainer extends Component {
  static propTypes = {
    user: PropTypes.string.isRequired,
    projects: PropTypes.array.isRequired,
    onProjectTap: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
  }

  componentWillReceiveProps ({ projectsInvalidated, user, dispatch }) {
    if (projectsInvalidated) {
      dispatch(fetchProjectsForUser(user));
    }
  }

  componentWillMount (nextProps) {
    if (this.props.user) {
      this.props.dispatch(fetchProjectsForUser(this.props.user));
    }
  }

  render () {
    return (
      <ProjectList
        onProjectTap={ this.props.onProjectTap }
        projects={ this.props.projects } />
    );
  }
}

function mapStateToProps (state) {
  const projects = Object.keys(state.projects)
    .map(id => state.projects[id])
    .filter(id => id.owner[0].userId === state.loggedInUser);

  return {
    projectsInvalidated: state.projects_invalidated,
    projects
  };
}

export default connect(mapStateToProps)(ProjectListContainer);