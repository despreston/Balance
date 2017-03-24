import React, { PropTypes } from 'react';
import { View } from 'react-native';

import Styles from './status-icon-style';
import Colors from '../colors';

function StatusIcon ({ lastUpdated }) {
  function iconColor () {
    const dayMilliseconds = 24*60*60*1000;
    const today = new Date();
    const difference = Math.round(
      Math.abs((lastUpdated.getTime() - today)) / dayMilliseconds
    );

    if (difference < 1) {
      return Colors.green;
    } else if (difference <= 7) {
      return Colors.yellow;
    } else if (difference <= 14) {
      return Colors.orange;
    }
    
    return Colors.red;
  }

  return <View style={ [Styles.icon, { backgroundColor: iconColor() }] } />;
};

StatusIcon.propTypes = {
  lastUpdated: PropTypes.instanceOf(Date).isRequired
};

export default StatusIcon;