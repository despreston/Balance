import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  Text,
  Dimensions
} from 'react-native';
import Styles from './explore-styles';
import ProjectList from './project-list/project-list';
import Refresh from '../../refresh/refresh';

class Explore extends Component {

  static propTypes = {
    summary: PropTypes.shape({
      newProjects: PropTypes.array.isRequired,
      recentlyUpdated: PropTypes.array.isRequired,
      popular: PropTypes.array.isRequired
    }).isRequired,
    onProjectSelect: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired
  }

  render () {
    const sliderWidth = Dimensions.get('window').width - 16;
    const itemWidth = (85 * sliderWidth) / 100;

    const refreshProps = {
      refreshing: false,
      onRefresh: this.props.refresh
    };

    return (
      <ScrollView
        style={ Styles.explore }
        refreshControl={ <Refresh { ...refreshProps } /> }
      >
        <Text style={ Styles.heading }>Popular</Text>
        <ProjectList
          projects={ this.props.summary.popular }
          onProjectSelect={ this.props.onProjectSelect }
          itemWidth={ itemWidth }
        />
        <Text style={ Styles.heading }>Recently Updated</Text>
        <ProjectList
          projects={ this.props.summary.recentlyUpdated }
          onProjectSelect={ this.props.onProjectSelect }
          itemWidth={ itemWidth }
        />
        <Text style={ Styles.heading }>
          New
          <Text style={ Styles.subHeading }>
            { ` (show them some ❤️)` }
          </Text>
        </Text>
        <ProjectList
          projects={ this.props.summary.newProjects }
          onProjectSelect={ this.props.onProjectSelect }
          itemWidth={ itemWidth }
        />
      </ScrollView>
    );
  }
}

export default Explore;
