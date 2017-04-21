// Vendors
import React, { Component, PropTypes } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';

// Components
import ProjectListItem from './project-list-item/project-list-item';
import Refresh from '../refresh/refresh';

import { Style } from './project-list-style';

class ProjectList extends Component {

  static propTypes = {
    onProjectTap: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
    loggedInUser: PropTypes.string.isRequired,
    refreshing: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired
  }

  constructor (props) {
    super();
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow (rowData) {
    const hideNudgeBtn = rowData.owner[0].userId === this.props.loggedInUser;

    return (
      <TouchableOpacity
        key={ rowData._id }
        onPress={ () => this.props.onProjectTap(rowData) }
        style={ Style.project }
      >
          <ProjectListItem project={ rowData } hideNudgeBtn={ hideNudgeBtn }/>
      </TouchableOpacity>
    );    
  }

  render () {
    const refreshProps = {
      refreshing: this.props.refreshing,
      onRefresh: this.props.onRefresh
    };

    return (
      <ScrollView
        refreshControl={ <Refresh { ...refreshProps } /> }
        keyboardShouldPersistTaps='handled'
        style={ Style.projectList }
      >
        { this.props.projects.map(p => this.renderRow(p)) }
      </ScrollView>
    );    
  }
 
}

export default ProjectList;