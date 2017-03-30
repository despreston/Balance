import React, { Component, PropTypes } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';

// components
import ProfileInfo from './profile-info/profile-info';
import NoteList from '../note-list/note-list';
import UserList from '../user-list/user-list';
import ProjectListContainer from '../project-list/project-list-container';
import EmptyMessage from './empty-message/empty-message';
import UserProfileSwitch from './user-profile-switch/user-profile-switch';
import Friends from './contexts/friends';
import Notes from './contexts/notes';

// actions
import {
  fetchFriendsForUser,
  requestNotes,
  requestUser
} from '../../actions';

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

  const user = state.users[userId];

  const notes = Object.keys(state.notes)
    .map(id => state.notes[id])
    .filter(note => note.user === userId);

  const friends = Object.keys(state.users)
    .map(id => state.users[id])
    .filter(userToFilter => {
      return user.friends.some(friend => {
        return friend.userId === userToFilter.userId && 
          friend.status === 'accepted';
      });
    });

  return {
    loggedInUser: state.loggedInUser,
    user,
    notes,
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
    loggedInUser: PropTypes.string.isRequired,
    user: PropTypes.object,
    notes: PropTypes.array,
    friends: PropTypes.array,
    nav: PropTypes.func.isRequired,
    requestLatestNotes: PropTypes.func.isRequired,
    fetchFriendsForUser: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.state = {
      context: 'latest',
      loadingContext: false
    };

    props.requestUser(props.user.userId).then(() => this.fetchLatestList());
  }

  fetchFriendsList () {
    return this.props.fetchFriendsForUser(this.props.user.userId)
      .then(() => this.setState({ loadingContext: false }));
  }

  fetchLatestList () {
    return this.props.requestLatestNotes([{ user: this.props.user.userId }])
      .then(() => this.setState({ loadingContext: false }));
  }

  renderLatest () {
    return (
      <Notes
        notes={ this.props.notes }
        name={ this.props.user.name }
        nav={ this.props.nav }
      />
    );
  }

  renderFriends () {
    return <Friends friends={ this.props.friends } nav={ this.props.nav } />;
  }

  renderProjects () {
    const { nav, user } = this.props;

    return (
      <ProjectListContainer
        onProjectTap={ project => nav('Project', { project: project._id }) }
        user={ user.userId }
      />
    );
  }

  renderBody () {

    switch (this.state.context) {
      case 'latest': return this.renderLatest();
      case 'friends': return this.renderFriends();
      case 'projects': return this.renderProjects();
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
    if (!this.props.user) {
      return <Text>Loading...</Text>;
    }

    return (
      <ScrollView style={ Styles.profile }>
        <View style={ Styles.profileInfo }>
            <ProfileInfo user={ this.props.user } />
            <UserProfileSwitch
              user={ this.props.user }
              hideProjects={ this.props.user.userId === this.props.loggedInUser }
              selectedContext={ this.state.context }
              switchContext={ (context) => this.switchContext(context) } />
        </View>
        <View style={ Styles.body }>
          { this.renderBody() }
        </View>
      </ScrollView>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToState)(UserProfile);
