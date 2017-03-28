import React, { PropTypes } from 'react';
import { View } from 'react-native';

import Styles from './status-icon-style';
import Colors from '../colors';

function StatusIcon ({ lastUpdated }) {
  function iconColor () {
    const dayMilliseconds = 24*60*60*1000;
    const today = new Date();
    const daysSinceUpdate = Math.round(
      Math.abs((lastUpdated.getTime() - today)) / dayMilliseconds
    );

    switch (true) {
      case (daysSinceUpdate < 2)   : return Colors.green;
      case (daysSinceUpdate <= 7)  : return Colors.yellow;
      case (daysSinceUpdate <= 14) : return Colors.orange;
      default                      : return Colors.red;
    }
  }

  return <View style={ [Styles.icon, { backgroundColor: iconColor() }] } />;
};

StatusIcon.propTypes = {
  lastUpdated: PropTypes.instanceOf(Date).isRequired
};

export default StatusIcon;