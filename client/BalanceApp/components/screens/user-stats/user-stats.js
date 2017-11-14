import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
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
        text: () => this.mostUpdated(this.props.stats)
      },
      {
        description: 'Longest streak',
        color: Colors.green,
        text: () => this.userStreak(this.props.stats)
      },
      {
        description: 'Most popular project',
        color: Colors.orange,
        text: () => this.mostPopular(this.props.stats)
      },
      {
        description: 'Avg time between updates',
        color: Colors.purple,
        text: () => this.averageTime(this.props.stats)
      }
    ];
  }

  mostUpdated ({ mostUpdatedProject }) {
    const updatedText = `(${mostUpdatedProject.updates} updates)`;

    if (mostUpdatedProject.project === 'Private') {
      return `Private project ${updatedText}`;
    }

    return `${mostUpdatedProject.project.title} ${updatedText}`;
  }

  userStreak ({ streak }) {
    return `${streak} updates`;
  }

  mostPopular ({ mostPopularProject }) {
    if (mostPopularProject) {
      const bookmarked = `(Bookmarked ${mostPopularProject.bookmarkCount}x)`;

      if (mostPopularProject.project === 'Private') {
        return `Private project ${bookmarked}`;
      }

      return `${mostPopularProject.project.title} ${bookmarked}`;
    }

    return 'No bookmarked projects';
  }

  averageTime ({ avgTimeBetweenUpdates }) {
    const daysInMs = 8.64e7;
    return `${Math.floor(avgTimeBetweenUpdates / daysInMs)} days`;
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
                    description={ stat.description }
                    color={ stat.color }
                    text={ <Text style={ Styles.text }>{ stat.text() }</Text> }
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
