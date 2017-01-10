'use strict';

import React, { Component} from 'react';
import ProjectList from '../project-list/project-list';

export default class MainScene extends Component {
  constructor() {
    super();
    this.projects = [{
      _id: 123,
      title: 'Big Fuckin Project',
      previousNote: 'Got shit done',
      futureNote: "Gonna get shit done",
      lastUpdated: new Date()
    }];
  }

  onClick() {
    console.log("TESTING THIS SHIT");
  }

  render() {
    return (
      <ProjectList projects={this.projects} onProjectTap={this.onClick}/>
    );
  }
}