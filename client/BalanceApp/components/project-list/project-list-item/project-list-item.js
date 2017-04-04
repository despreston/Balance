// Vendors
import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

// Components
import StatusIcon from '../../status-icon/StatusIcon';
import Nudges from '../../nudges/nudges';
import NudgeBtn from '../../nudges/nudge-button/nudge-button';
import UpdateIcon from './update-icon/update-icon';

// styles
import { Style } from './project-list-item-style';

// utils
import { formatDate } from '../../../utils/helpers';

function ProjectListItem ({ project, hideNudgeBtn = false }) {
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
    }

    if (Future) {
      return (
        <Text style={ Style.note } numberOfLines={ 2 }>
          { Future.content }
        </Text>
      )
    }

    return <Text style={ Style.message }>Nothing done for this yet. 😕</Text>;
  }

  function renderNudgeUsers () {
    if (nudgeUsers && nudgeUsers.length > 0) {
      return <Nudges nudgeUsers={ nudgeUsers } linkToUpdate={ true }/>
    }

    return null;
  }

  function renderNudgeBtn () {
    if (hideNudgeBtn || status === 'finished') {
      return <View />;
    }

    return <NudgeBtn style={ Style.nudgeBtn } project={ project._id } />;
  }

  function renderUpdatedAt () {
    if (!lastUpdated) {
      return null;
    }

    return (
      <Text style={ Style.text }>Updated { formatDate(lastUpdated) }</Text>
    );
  }

  function renderStatusIcon () {
    if (!lastUpdated || status !== 'active') {
      return <View style={{ width: 10 }} />;
    }

    return <StatusIcon lastUpdated={ lastUpdated } />;
  }

  function renderUpdateButton () {
    if (status !== 'active' || !hideNudgeBtn) {
      return null;
    }

    return <UpdateIcon project={ project } />;
  }
  
  return (
    <View style={ Style.projectListItem }>
      <View style={ Style.content }>
        <View>
          <Text style={ Style.title }>{ project.title }</Text>
          { renderUpdatedAt() }
        </View>
        { renderNote() }
        <View style={ Style.footer }>
          <View style={ Style.footerIcons }>
            { renderNudgeBtn() }
            { renderUpdateButton() }
          </View>
          { renderNudgeUsers() }
        </View>
      </View>
      { renderStatusIcon() }
    </View>
  );
}

ProjectListItem.propTypes = {
  project: PropTypes.object.isRequired,
  hideNudgeBtn: PropTypes.bool
};

export default ProjectListItem;