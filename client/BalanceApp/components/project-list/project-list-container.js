// Vendors
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Components
import ProjectList from './project-list';
import { fetchProjects } from '../../actions';

class ProjectListContainer extends Component {
  static propTypes = {
    projects: PropTypes.array.isRequired,
    onProjectTap: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.dispatch(fetchProjects());
  }

  render () {
    return (<ProjectList onProjectTap={this.props.onProjectTap} projects={this.props.projects} />);
  }
}

function mapStateToProps (state) {
  return {
    projects: state.projects
  };
}

export default connect(mapStateToProps)(ProjectListContainer);