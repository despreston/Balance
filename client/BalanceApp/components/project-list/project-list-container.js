// Vendors
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

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

    this.state = { projects: [], filtered: [] };

    props.fetchProjectsForUser(props.user);
  }

  componentWillReceiveProps (nextProps) {
    const {
      projects,
      projectsInvalidated,
      user,
      fetchProjectsForUser
    } = nextProps;

    // TODO: get filtered project by getting setting from AsyncStorage
    this.setState({ projects, filtered: projects });

    if (projectsInvalidated) {
      fetchProjectsForUser(user);
    }
  }

  onFilterChange (value) {
    switch (value) {
      case 'All':
        return this.setState({
          filtered: this.state.projects
        });
      case 'Finished':
        return this.setState({
          filtered: this.state.projects.filter(p => p.status === 'finished')
        });
      case 'In Progress':
        return this.setState({
          filtered: this.state.projects.filter(p => p.status !== 'finished')
        });
    }
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        {
          this.props.showFilter &&
          <ProjectFilter onChange={ this.onFilterChange.bind(this) } />
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