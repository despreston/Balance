// Vendors
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import ProjectList from './project-list';
import { fetchProjects } from '../../actions';

class ProjectListContainer extends Component {
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