// Vendors
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, View } from 'react-native';

// Components
import ProjectList from './project-list';
import ProjectFilter from './project-filter/project-filter';
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
    fetchProjectsForUser: PropTypes.func.isRequired,
    showFilter: PropTypes.bool
  }

  constructor (props) {
    super(props);

    this.state = { projects: [], filtered: [], filter: 'All' };

    props.fetchProjectsForUser(props.user);
  }

  componentWillReceiveProps (nextProps) {
    const {
      projects,
      projectsInvalidated,
      user,
      fetchProjectsForUser
    } = nextProps;

    this.loadFilterValue().then(filter => {
      if (filter === null) {
        filter = 'All';
      }

      this.setProjectStates(projects, filter);
    });

    if (projectsInvalidated) {
      fetchProjectsForUser(user);
    }
  }

  loadFilterValue () {
    return AsyncStorage.getItem('PROJECTS_FILTER');
  }

  saveFilterValue (value) {
    return AsyncStorage.setItem('PROJECTS_FILTER', value);
  }

  getFilteredProjects (projects, filter) {
    switch (filter) {
      case 'All':
        return projects;
      case 'Finished':
        return projects.filter(p => p.status === 'finished');
      case 'In Progress':
        return projects.filter(p => p.status !== 'finished');
    }
  }

  setProjectStates (projects, filter) {
    this.setState({
      filter,
      projects,
      filtered: this.getFilteredProjects(projects, filter)
    })
  }

  onFilterChange (filter) {
    this.saveFilterValue(filter).then(() => {
      this.setProjectStates(this.state.projects, filter);
    });
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        {
          this.props.showFilter &&
          <ProjectFilter
            filter={ this.state.filter }
            onChange={ this.onFilterChange.bind(this) }
          />
        }
        <ProjectList
          loggedInUser={ this.props.loggedInUser }
          onProjectTap={ this.props.onProjectTap }
          projects={ this.state.filtered }
        />
      </View>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer);