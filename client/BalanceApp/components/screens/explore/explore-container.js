import React, { Component } from 'react';
import { Text } from 'react-native';
import Explore from './explore';
import { api } from '../../../utils/api';

class ExploreContainer extends Component {

  static navigationOptions = { title: 'Explore' }

  constructor (props) {
    super(props);

    this.state = {
      loading: true,
      summary: {}
    };

    this.onProjectSelect = this.onProjectSelect.bind(this);
    this.init();
  }

  async init () {
    const summary = await api('explore/summary');
    this.setState({ loading: false, summary });
  }

  onProjectSelect (project) {
    this.props.navigation.navigate('Project', { project });
  }

  render () {
    if (this.state.loading) {
      return <Text>Loading...</Text>
    }

    return (
      <Explore
        onProjectSelect={ this.onProjectSelect }
        summary={ this.state.summary }
        refresh={ this.init.bind(this) }
      />
    );
  }
}

export default ExploreContainer;
