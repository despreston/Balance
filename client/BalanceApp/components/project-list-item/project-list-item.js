'use strict';

import React, { PropTypes } from 'react';
import { View,Text } from 'react-native';

const ProjectListItem = ({ onClick, data }) => (
  <View>
    <Text>{data.title}</Text>
    <Text>{data.previousNote}</Text>
    <Text>{data.futureNote}</Text>
    <Text>{data.lastUpdated.toString()}</Text>
  </View>
);

ProjectListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default ProjectListItem;