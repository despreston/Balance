'use strict';

import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

function ProjectListItem ({ onClick, data }) {
  return (<View>
    <Text>{data.title}</Text>
    <Text>{data.previousNote}</Text>
    <Text>{data.futureNote}</Text>
    <Text>{data.lastUpdated.toString()}</Text>
  </View>);
}

ProjectListItem.propTypes = {
  data: PropTypes.object.isRequired
};

export default ProjectListItem;