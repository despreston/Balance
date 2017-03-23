// Vendors
import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

// Components
import StatusIcon from '../../status-icon/StatusIcon';
import Nudges from '../../nudges/nudges';

// styles
import { Style } from './project-list-item-style';

// utils
import { formatDate } from '../../../utils/helpers';

function ProjectListItem ({ project }) {
  const { Past, Future, status, nudgeUsers } = project;
  let lastUpdated;

  if (Past && Future) {
    lastUpdated = Past.lastUpdated.getTime() > Future.lastUpdated.getTime() ?
    Past.lastUpdated : Future.lastUpdated;
  } else if (Past) {
    lastUpdated = Past.lastUpdated;
  } else if (Future) {
    lastUpdated = Future.lastUpdated; 
  }

  function renderNote () {
    if (status === 'finished') {
      return (
        <Text style={ [Style.text, Style.finished] }>
          This project is finished!
        </Text>
      );
    } else if (Past) {
      return (
        <Text style={ Style.note } numberOfLines={ 1 }>
          { Past.content }
        </Text>
      )
    }

    return (
      <Text style={ Style.finished }>
        Nothing done for this yet. 😕
      </Text>
    );
  }

  function renderNudgeUsers () {
    if (nudgeUsers && nudgeUsers.length > 0) {
      return <Nudges nudgeUsers={ nudgeUsers } />
    }

    return null;
  }
  
  return (
    <View style={ Style.projectListItem }>
      <View style={ Style.content }>
          <Text style={ Style.title }>{ project.title }</Text>
          {
            lastUpdated && <Text style={ Style.text }>
              Updated { formatDate(lastUpdated) }
            </Text>
          }
          { renderNote() }
          { renderNudgeUsers() }
      </View>
      {
        lastUpdated && status === 'active' &&
        <StatusIcon lastUpdated={ lastUpdated } />
      }
    </View>
  );
}

ProjectListItem.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectListItem;