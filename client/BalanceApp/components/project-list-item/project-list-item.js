// Vendors
import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

// Components
import StatusIcon from '../status-icon/StatusIcon';
import { Style } from './project-list-item-style';

function ProjectListItem ({ project }) {
  return (
    <View style={Style.projectListItem}>
      <View style={Style.header}>
        <Text style={Style.title}>{project.title}</Text>
        <StatusIcon lastUpdated={project.lastUpdated} />
      </View>
      <View style={Style.notes}>
        <Text style={Style.noteContent}><Text style={Style.noteType}>Last:</Text> {project.previousNote}</Text>
        <Text style={Style.noteContent}><Text style={Style.noteType}>Next:</Text> {project.futureNote}</Text>
      </View>
      <Text style={Style.lastUpdated}>Last Updated: {project.lastUpdated.toLocaleString()}</Text>
    </View>
  );
}

ProjectListItem.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectListItem;