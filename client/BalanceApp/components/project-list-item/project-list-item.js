// Vendors
import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

// Components
import StatusIcon from '../status-icon/StatusIcon';
import { Style } from './project-list-item-style';

function ProjectListItem ({ project }) {
  const { Past, Future } = project;
  let lastUpdated;

  if (Past || Future) {
    if (Past && Future) {
      lastUpdated = Past.lastUpdated.getTime() > Future.lastUpdated.getTime() ?
      Past.lastUpdated : Future.lastUpdated;
    }
    lastUpdated = Past.lastUpdated || Future.lastUpdated;
  }

  function getEmptyNotesMessage () {
    return !(Past || Future)
      ? (<Text style={Style.empty}>Nothing yet. 😕</Text>)
      : null;
  }

  return (
    <View style={Style.projectListItem}>
      <View style={Style.header}>
        <Text style={Style.title}>{project.title}</Text>
        {lastUpdated && <StatusIcon lastUpdated={lastUpdated} />}
      </View>
      <View style={Style.notes}>
        {Past && <Text style={Style.noteContent}><Text style={Style.noteType}>Last:</Text> {Past.content}</Text>}
        {Future && <Text style={Style.noteContent}><Text style={Style.noteType}>Next:</Text> {Future && Future.content}</Text>}
        {getEmptyNotesMessage()}
      </View>
      {lastUpdated && <Text style={Style.lastUpdated}>Last Updated: {lastUpdated.toLocaleString()}</Text>}
    </View>
  );
}

ProjectListItem.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectListItem;