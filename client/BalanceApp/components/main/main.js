'use strict';

import React, { Component} from 'react';
import ProjectListContainer from '../project-list/project-list-container';

export default class MainScene extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <ProjectListContainer />
    );
  }
}