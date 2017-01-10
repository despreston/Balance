'use strict';

import React, { Component, PropTypes } from 'react';
import { View, ListView } from 'react-native';
import ProjectListItem from '../project-list-item/project-list-item';

const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
const ProjectList = ({ projects, onProjectTap }) => (
  <ListView
    dataSource={ds.cloneWithRows(projects)}
    renderRow={(rowData) => <ProjectListItem data={rowData} onClick={onProjectTap}/>}
  />
);

ProjectList.propTypes = {
  projects: PropTypes.array.isRequired,
  onProjectTap: PropTypes.func.isRequired
};

export default ProjectList;