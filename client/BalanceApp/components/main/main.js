'use strict';

import React, { Component} from 'react';
import ProjectListContainer from '../project-list/project-list-container';

export default class MainScene extends Component {
  constructor() {
    super();
  }

  onClick() {
    console.log("TESTING THIS SHIT");
  }

  render() {
    return (
      <ProjectListContainer />
    );
  }
}