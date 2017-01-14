'use strict';

// Vendors
import React, { Component, PropTypes } from 'react';
import { View, ListView } from 'react-native';

// Components
import ProjectListItem from '../project-list-item/project-list-item';
import { Style } from './project-list-style';

const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});

function ProjectList (props) {
  return (
    <ListView
      style={Style.projectList}
      dataSource={ds.cloneWithRows(props.projects)}
      renderRow={(rowData) => <ProjectListItem project={rowData}/>}
    />
  );
}

ProjectList.propTypes = {
  projects: PropTypes.array.isRequired
};

export default ProjectList;