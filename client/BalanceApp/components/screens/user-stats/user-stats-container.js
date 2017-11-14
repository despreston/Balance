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
          user: PropTypes.shape({
            userId: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
          })
        })
      })
    })
  }

  static navigationOptions = ({ navigation: { state } }) => {
    return { title: state.params.name };
  }

  constructor (props) {
    super(props);
    this.state = { stats: null };
    this.fetchStats();
  }

  componentWillMount () {
    this.props.navigation.setParams({
      name: this.props.navigation.state.params.user.username
    });
  }

  async fetchStats() {
    const { userId } = this.props.navigation.state.params.user;
    const stats = await api(`users/${userId}/stats`);
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
