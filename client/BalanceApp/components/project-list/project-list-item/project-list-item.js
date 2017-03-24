// Vendors
import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

// Components
import StatusIcon from '../../status-icon/StatusIcon';
import Nudges from '../../nudges/nudges';
import NudgeBtn from '../../nudges/nudge-button/nudge-button';

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
        <Text style={ Style.message }>
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
      <Text style={ Style.message }>
        Nothing done for this yet. 😕
      </Text>
    );
  }

  function renderNudgeUsers () {
    if (nudgeUsers && nudgeUsers.length > 0) {
      return <Nudges nudgeUsers={ nudgeUsers } linkToUpdate={ true }/>
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
          <View style={ Style.footer }>
            { renderNudgeUsers() }
            { 
              lastUpdated && status === 'active' &&
              <NudgeBtn style={ Style.nudgeBtn } project={ project._id } />
            }
          </View>
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