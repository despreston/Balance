import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { api } from '../../../utils/api';
import actions from '../../../actions/';
import Notifications from './notifications';
import NavBtn from '../../navigation/nav-btn';

class NotificationsContainer extends Component {

  static mapStateToProps (state) {
    return {
      user: state.users[state.loggedInUser],
      notifications: Object.values(state.notifications)
    };
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    notifications: PropTypes.array.isRequired
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;

    let headerRight = (
      <NavBtn
        title='Clear'
        onPress={ () => state.params.clear() }
      />
    );

    return { headerRight, title: 'Notifications' };
  }

  constructor (props) {
    super(props);
    this.state = { friend_requests: [], refreshing: false };
    this.fetchAll = this.fetchAll.bind(this);
    this.refresh = this.refresh.bind(this);
    this.fetchAll();
  }

  async componentWillReceiveProps (nextProps) {
    const requested = friends => friends.filter(friend => {
      return friend.status === 'requested';
    });

    const oldFriendCount = requested(this.props.user.friends).length;
    const newFriendCount = requested(nextProps.user.friends).length;

    if (newFriendCount !== oldFriendCount) {
      const friend_requests = await this.fetchFriendRequests();
      this.setState({ friend_requests });
    }
  }

  componentWillMount () {
    this.props.navigation.setParams({
      clear: this.props.dispatch.bind(actions.clearNotifications())
    });
  }

  async fetchAll () {
    await this.props.dispatch(actions.markAsRead());
    await this.props.dispatch(actions.fetchNotifications());
    const friend_requests = await this.fetchFriendRequests();
    this.setState({ friend_requests });
  }

  fetchFriendRequests () {
    return api(`users/${this.props.user.userId}/friends?status=requested`);
  }

  async refresh () {
    this.setState({ refreshing: true });
    await this.fetchAll();
    this.setState({ refreshing: false });
  }

  render () {
    return (
      <Notifications
        notifications={ this.props.notifications }
        refreshing={ this.state.refreshing }
        onRefresh={ () => this.refresh() }
        nav={ this.props.navigation.navigate }
        friendRequests={ this.state.friend_requests }
        user={ this.props.user }
      />
    );
  }

}

export default connect(NotificationsContainer.mapStateToProps)(NotificationsContainer);
