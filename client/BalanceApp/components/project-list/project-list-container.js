// Vendors
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Components
import ProjectList from './project-list';
import { fetchProjects } from '../../actions';

class ProjectListContainer extends Component {
  static propTypes = {
    user: PropTypes.string.isRequired,
    projects: PropTypes.object.isRequired,
    onProjectTap: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
  }

  componentWillMount (nextProps) {
    if (this.props.user) {
      this.props.dispatch(fetchProjects(this.props.user));
    }
  }

  render () {
    return (
      <ProjectList
        onProjectTap={this.props.onProjectTap}
        projects={this.props.projects} />
    );
  }
}

function mapStateToProps (state) {
  return {
    projects: state.projects
  };
}

export default connect(mapStateToProps)(ProjectListContainer);