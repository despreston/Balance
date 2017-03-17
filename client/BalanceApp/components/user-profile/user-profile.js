import React, { Component, PropTypes } from 'react';
import { ScrollView, View, Text } from 'react-native';
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

  let userId, nav;

  /**
   * if nav'ing directly thru react-navigator, the userId is passed as
   * ownProps.navigation.state.params.userId
   */
  if (ownProps.navigation) {
    nav = ownProps.navigation.navigate;
    userId = ownProps.navigation.state.params.userId;
  } else {
    nav = ownProps.nav;
    userId = ownProps.userId;
  }

  return {
    userId,
    users: state.users,
    notes: state.notes,
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
    users: PropTypes.object,
    notes: PropTypes.object,
    nav: PropTypes.func.isRequired,
    requestLatestNotes: PropTypes.func.isRequired,
    fetchFriendsForUser: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.state = {
      context: 'latest',
      loadingContext: false,
      latestNotes: [],
      friends: [],
      user: null
    };

    props.requestUser(props.userId).then(() => {
      this.fetchLatestList();
    });
  }

  componentWillReceiveProps (nextProps) {
    const user = nextProps.users[nextProps.userId];

    if (user) {
      this.setState({ user });
    }
  }

  latestNotes () {
    // latest notes for user
    return Object.keys(this.props.notes)
      .map(id => this.props.notes[id])
      .filter(note => note.user === this.props.userId);
  }

  friends () {
    // friends of user
    const user = this.props.users[this.props.userId];

    return Object.keys(this.props.users)
      .map(id => this.props.users[id])
      .filter(userToFilter => {
        return user.friends.some(friend => {
          return friend.userId === userToFilter.userId && 
            friend.status === 'accepted';
        });
      });
  }

  fetchFriendsList () {
    return this.props.fetchFriendsForUser(this.props.userId)
      .then(() => {
        this.setState({ loadingContext: false, friends: this.friends() });
      });
  }

  fetchLatestList () {
    return this.props.requestLatestNotes([{ user: this.props.userId }])
      .then(() => {
        this.setState({
          loadingContext: false,
          latestNotes: this.latestNotes()
        });
      });
  }

  renderLatest () {
    if (this.state.latestNotes.length > 0) {
      return (
        <NoteList
          onSelect={ id => this.props.nav('Note', { id })}
          notes={ this.state.latestNotes }
          showContext={true} />
      );
    }
    return (
      <EmptyMessage
        message={ `${this.state.user.name} hasn't started any projects yet.` }
      />
    );
  }

  renderFriends () {
    if (this.state.friends.length > 0) {
      return (
        <UserList
          users={ this.state.friends }
          onUserSelect={ userId => this.props.nav('UserProfile', { userId }) } />
      );
    }
    return <EmptyMessage message='No friends yet.' />;
  }

  renderBody () {
    if (this.state.loadingContext) {
      return <Text>loading...</Text>;
    }

    switch (this.state.context) {
      case 'latest': return this.renderLatest();
      case 'friends': return this.renderFriends();
    }
  }

  switchContext (context) {
    this.setState({ loadingContext: true, context });

    switch (context) {
      case 'latest': return this.fetchLatestList();
      case 'friends': return this.fetchFriendsList();
    }
  }

  render () {
    if (!this.state.user) {
      return <Text>Loading...</Text>;
    }

    return (
      <ScrollView style={ Styles.profile }>
        <View style={ Styles.profileInfo }>
           <View>
            <ProfileInfo user={ this.state.user } />
            <UserProfileSwitch
              user={ this.state.user }
              hideProjects={ true }
              selectedContext={ this.state.context }
              switchContext={ (context) => this.switchContext(context) } />
          </View>
        </View>
        <View style={ Styles.body }>
          { this.renderBody() }
        </View>
      </ScrollView>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToState)(UserProfile);
