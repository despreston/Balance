// Vendors
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Components
import ProjectList from './project-list';
import { fetchProjectsForUser } from '../../actions';

function mapStateToProps (state, ownProps) {
  const projects = Object.keys(state.projects)
    .map(id => state.projects[id])
    .filter(project => project.owner[0].userId === ownProps.user);

  return {
    projectsInvalidated: state.projects_invalidated,
    loggedInUser: state.loggedInUser,
    projects
  };
}

const mapDispatchToProps = { fetchProjectsForUser };

class ProjectListContainer extends Component {

  static propTypes = {
    user: PropTypes.string.isRequired,
    projects: PropTypes.array.isRequired,
    onProjectTap: PropTypes.func.isRequired,
    fetchProjectsForUser: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);

    props.fetchProjectsForUser(props.user);
  }

  componentWillReceiveProps ({ projectsInvalidated, user, fetchProjectsForUser }) {
    if (projectsInvalidated) {
      fetchProjectsForUser(user);
    }
  }

  render () {
    return (
      <ProjectList
        loggedInUser={ this.props.loggedInUser }
        onProjectTap={ this.props.onProjectTap }
        projects={ this.props.projects } />
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer);