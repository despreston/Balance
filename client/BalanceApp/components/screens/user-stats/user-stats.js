import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
// import {
//   VictoryZoomContainer,
//   VictoryChart,
//   VictoryArea
// } from 'victory-native';
import Stat from './stat/stat';
import Styles from './user-stats-styles';
import Colors from '../../colors';

class UserStats extends Component {

  static propTypes = {
    stats: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);

    this.stats = [
      {
        description: 'Most updated project',
        color: Colors.blue,
        icon: require('../../../assets/icons/star-filled.png'),
        text: this.mostUpdated(props.stats)
      },
      {
        description: 'Longest streak',
        color: Colors.green,
        icon: require('../../../assets/icons/star-filled.png'),
        text: this.userStreak(props.stats)
      },
      {
        description: 'Most popular project',
        color: Colors.orange,
        icon: require('../../../assets/icons/star-filled.png'),
        text: this.mostPopular(props.stats)
      },
      {
        description: 'Avg time between updates',
        color: Colors.yellow,
        icon: require('../../../assets/icons/star-filled.png'),
        text: this.averageTime(props.stats)
      }
    ];
  }

  mostUpdated ({ mostUpdatedProject }) {
    return (
      <Text style={ Styles.text }>
        { `${mostUpdatedProject.project.title} (${mostUpdatedProject.updates} updates)`}
      </Text>
    );
  }

  userStreak ({ streak }) {
    return <Text>{ `${streak} updates` }</Text>;
  }

  mostPopular({ mostPopularProject }) {
    if (mostPopularProject.project) {
      return <Text>{ `${mostPopularProject.project.title} (Bookmarked ${mostPopularProject.bookmarkCount}x)` }</Text>;
    }

    return <Text>No projects yet</Text>
  }

  averageTime({ avgTimeBetweenUpdates }) {
    const daysInMs = 8.64e7;
    return <Text>{ `${Math.floor(avgTimeBetweenUpdates / daysInMs)} days` }</Text>
  }

  render () {
    return (
      <ScrollView
        style={ Styles.userStats }
        keyboardShouldPersistTaps='handled'
      >
        <View style={ Styles.stats }>
          {
            this.stats.map( (stat, idx) => {
              return (
                <View key={ idx } style={ Styles.stat }>
                  <Stat
                    icon={ stat.icon }
                    description={ stat.description }
                    color={ stat.color }
                    text={ stat.text }
                  />
                </View>
              );
            })
          }
        </View>
      </ScrollView>
    );
  }
}

export default UserStats;


// <VictoryChart
        //   containerComponent={
        //     <VictoryZoomContainer
        //       zoomDomain={{ x: [8, 12] }}
        //       allowZoom={ false }
        //     />
        //   }
        // >
        //   <VictoryArea
        //     interpolation="natural"
        //     style={{
        //       data: {
        //         fill: "#432B52",
        //         fillOpacity: 0.1,
        //         strokeWidth: 3
        //       }
        //     }}
        //     domain={{ y: [0, 10] }}
        //     categories={{
        //       x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        //     }}
        //     data={[
        //       { x: 1, y: 2, y0: 0 },
        //       { x: 2, y: 3, y0: 0 },
        //       { x: 3, y: 5, y0: 0 },
        //       { x: 4, y: 3, y0: 0 },
        //       { x: 5, y: 5, y0: 0 },
        //       { x: 6, y: 2, y0: 0 },
        //       { x: 7, y: 3, y0: 0 },
        //       { x: 8, y: 5, y0: 0 },
        //       { x: 9, y: 3, y0: 0 },
        //       { x: 10, y: 5, y0: 0 },
        //       { x: 11, y: 3, y0: 0 },
        //       { x: 12, y: 5, y0: 0 }
        //     ]}
        //   />
        // </VictoryChart>
