import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text } from 'react-native';
import { api } from '../../../utils/api';
import UserStats from './user-stats';

class UserStatsContainer extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          user: PropTypes.string.isRequired
        })
      })
    })
  }

  static navigationOptions = () => ({ title: 'User stats' })

  constructor (props) {
    super(props);

    this.state = { stats: null };

    this.fetchStats();
  }

  async fetchStats() {
    const { user } = this.props.navigation.state.params;
    const stats = await api(`users/${user}/stats`);

    this.setState({ stats });
  }

  render () {
    if (!this.state.stats) {
      return <Text>'Loading'</Text>;
    }

    return <UserStats stats={ this.state.stats } />;
  }
}

export default UserStatsContainer;
