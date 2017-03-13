import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

// components
import ProfileInfo from './profile-info/profile-info';
import NoteList from '../note-list/note-list';
import UserList from '../user-list/user-list';
import EmptyMessage from './empty-message/empty-message';
import UserProfileSwitch from './user-profile-switch/user-profile-switch';

// actions
import { fetchFriendsForUser, requestNotes, requestUser } from '../../actions';

// styles
import Styles from './profile-styles';

function mapStateToProps (state, ownProps) {

  let user, userId, latestNotes = [], friends = [];

  /**
   * if nav'ing directly thru react-navigator, the userId is passed as
   * ownProps.navigation.state.params.userId
   *
   * TODO: when initialRouteParams is fixed, Profile component can be replaced
   * with this UserProfile component and the tab nav can go directly to this
   * component with the initialRouteParam set to the logged in user.
   */
  if (ownProps.navigation) {
    nav = ownProps.navigation.navigate;
    userId = ownProps.navigation.state.params.userId;
    user = state.users[userId];
    delete ownProps.navigation;
  } else {
    nav = ownProps.nav;
    userId = ownProps.userId,
    user = state.users[userId];
  }

  if (user) {
    // latest notes for user
    latestNotes = Object.keys(state.notes)
      .map(id => state.notes[id])
      .filter(note => note.user === userId);

    // friends of user
    friends = Object.keys(state.users)
      .map(id => state.users[id])
      .filter(userToFilter => {
        return user.friends.some(friend => {
          return friend.userId === userToFilter.userId && 
            friend.status === 'accepted';
        });
      });
  }

  return {
    userId,
    user: user || {},
    latestNotes,
    friends,
    nav
  };

}

function mapDispatchToState (dispatch) {
  return {
    requestLatestNotes: params => dispatch(requestNotes(params)),
    fetchFriendsForUser: id => dispatch(fetchFriendsForUser(id)),
    requestUser: id => dispatch(requestUser(id, false))
  };
}

class UserProfile extends Component {
  
  static propTypes = {
    userId: PropTypes.string.isRequired,
    user: PropTypes.object,
    nav: PropTypes.func.isRequired,
    latestNotes: PropTypes.array.isRequired,
    friends: PropTypes.array.isRequired,
    requestLatestNotes: PropTypes.func.isRequired,
    fetchFriendsForUser: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.state = {
      loading: true,
      context: 'latest',
      loadingContext: false,
      friends: []
    };

    props.requestUser(props.userId).then(() => this.fetchLatestList());
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ friends: nextProps.friends });
  }

  fetchFriendsList () {
    this.props.fetchFriendsForUser(this.props.user.userId).then(() => {
      this.setState({ loadingContext: false, loading: false });
    });
  }

  fetchLatestList () {
    this.props.requestLatestNotes([{ user: this.props.user.userId }])
      .then(() => {
        this.setState({ loadingContext: false, loading: false });
      });
  }

  onUserSelect (userId) {
    this.props.nav('UserProfile', { userId });
  }

  renderLatest () {
    if (this.props.latestNotes.length > 0) {
      return (
        <NoteList
          notes={ this.props.latestNotes }
          showContext={true} />
      );
    }
    return (
      <EmptyMessage
        message={ `${this.props.user.name} hasn't started any projects yet.` }
      />
    );
  }

  renderFriends () {
    if (this.state.friends.length > 0) {
      return (
        <UserList
          users={ this.state.friends }
          onUserSelect={ this.onUserSelect.bind(this) } />
      );
    }
    return <EmptyMessage message='No friends yet.' />;
  }

  renderBody () {
    if (this.state.loadingContext) {
      return <Text>loading...</Text>;
    }

    switch (this.state.context) {
      case 'latest':
        return this.renderLatest();
      case 'friends':
        return this.renderFriends();
    }
  }

  switchContext (context) {
    this.setState({ loadingContext: true, context });

    switch (context) {
      case 'latest':
        this.fetchLatestList();
        break;
      case 'friends':
        this.fetchFriendsList();
        break;
    }
  }

  renderHeader () {
    if (this.state.loading) {
      return null;
    }
    return (
      <View>
        <ProfileInfo user={ this.props.user } />
        <UserProfileSwitch
          user={ this.props.user }
          hideProjects={ true }
          selectedContext={ this.state.context }
          switchContext={ (context) => this.switchContext(context) } />
      </View>
    );
  }

  render () {
    return (
      <View style={ Styles.profile }>
        <View style={ Styles.profileInfo }>
          { this.renderHeader() }
        </View>
        <View style={ Styles.body }>
          { this.renderBody() }
        </View>
      </View>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToState)(UserProfile);
