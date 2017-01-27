// Vendors
import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

// Components
import StatusIcon from '../status-icon/StatusIcon';
import { Style } from './project-list-item-style';

function ProjectListItem ({ project }) {
  const lastUpdated = project.Past.lastUpdated.getTime() > project.Future.lastUpdated.getTime() ?
      project.Past.lastUpdated : project.Future.lastUpdated;

  return (
    <View style={Style.projectListItem}>
      <View style={Style.header}>
        <Text style={Style.title}>{project.title}</Text>
        <StatusIcon lastUpdated={lastUpdated} />
      </View>
      <View style={Style.notes}>
        <Text style={Style.noteContent}><Text style={Style.noteType}>Last:</Text> {project.Past.content}</Text>
        <Text style={Style.noteContent}><Text style={Style.noteType}>Next:</Text> {project.Future.content}</Text>
      </View>
      <Text style={Style.lastUpdated}>Last Updated: {lastUpdated.toLocaleString()}</Text>
    </View>
  );
}

ProjectListItem.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectListItem;