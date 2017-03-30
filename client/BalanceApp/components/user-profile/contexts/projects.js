import React, { Component, PropTypes } from 'react';
import ProjectList from '../../project-list/project-list';
import EmptyMessage from '../empty-message/empty-message';

function Projects ({ projects, nav, loggedInUser }) {

  if (projects.length > 0) {
    return (
      <ProjectList
        loggedInUser={ loggedInUser }
        projects={ projects }
        onProjectTap={ project => nav('Project', { project: project._id }) }
      />
    );
  }

  return <EmptyMessage message='No projects yet.' />;
  
};

Projects.propTypes = {
  projects: PropTypes.array.isRequired,
  nav: PropTypes.func.isRequired,
  loggedInUser: PropTypes.string.isRequired
};

export default Projects;