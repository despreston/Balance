// Vendors
import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

// Components
import StatusIcon from '../../status-icon/StatusIcon';
import { Style } from './project-list-item-style';

function ProjectListItem ({ project }) {
  const { Past, Future, status } = project;
  let lastUpdated;

    if (Past && Future) {
      lastUpdated = Past.lastUpdated.getTime() > Future.lastUpdated.getTime() ?
      Past.lastUpdated : Future.lastUpdated;
    } else if (Past) {
      lastUpdated = Past.lastUpdated;
    } else if (Future) {
      lastUpdated = Future.lastUpdated; 
    }

  function getEmptyNotesMessage () {
    return !(Past || Future)
      ? (<Text style={[Style.noteContent, Style.center]}>Nothing yet. 😕</Text>)
      : null;
  }

  function privacyLevelIcon (level) {
    switch (level) {
      case 'global':  return '🌎';
      case 'friends': return '👥';
      case 'private': return '🔒';
      default:        return '';
    };
  }

  function renderNotes () {
    if (status === 'finished') {
      return (
        <View style={ Style.notes }>
          <Text style={ [Style.center, Style.noteContent] }>
            You finished this project. Hooray!
          </Text>
        </View>
      );
    }

    return (
      <View style={ Style.notes }>
        {
          Past && <Text style={ Style.noteContent }>
            <Text style={ Style.noteType }>Last: </Text>
            { Past.content }
          </Text>
        }
        {
          Future && <Text style={ Style.noteContent }>
            <Text style={ Style.noteType }>Next: </Text>
            { Future.content }
          </Text>
        }
        { getEmptyNotesMessage() }
      </View>
    );
  }
  
  return (
    <View style={ Style.projectListItem }>
      <View style={ Style.header }>
        <Text style={ Style.title }>{ project.title }</Text>
        { 
          lastUpdated && status === 'active' &&
          <StatusIcon lastUpdated={ lastUpdated } />
        }
      </View>
      { renderNotes() }
      <View style={ Style.footer }>
        <Text style={ [Style.footerText, Style.privacyIcon] }>
          { privacyLevelIcon(project.privacyLevel) }
        </Text>
        {
          lastUpdated && <Text style={ Style.footerText }>
            Last Updated: { lastUpdated.toLocaleString() }
          </Text>
        }
      </View>

    </View>
  );
}

ProjectListItem.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectListItem;