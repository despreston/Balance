import React, { PropTypes } from 'react';
import { View } from 'react-native';
import { Style } from './status-icon-style';

function StatusIcon ({ lastUpdated }) {
  function iconColor () {
    const dayMilliseconds = 24*60*60*1000;
    const today = new Date();
    const difference = Math.round(Math.abs((lastUpdated.getTime() - today)) / dayMilliseconds);

    if (difference < 1) {
      return '#B0D391';
    } else if (difference <= 7) {
      return '#DDDDDD';
    } else if (difference <= 14) {
      return '#FACA9C';
    }
    
    return '#B86D6F';
  }

  const color = iconColor();

  return (
    <View style={ [ Style.Icon, { backgroundColor: color, shadowColor: color } ] }></View>
  );
};

StatusIcon.propTypes = {
  lastUpdated: PropTypes.instanceOf(Date).isRequired
};

export default StatusIcon;