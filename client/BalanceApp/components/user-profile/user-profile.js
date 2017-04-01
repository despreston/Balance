import React, { Component, PropTypes } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';

// components
import ProfileInfo from './profile-info/profile-info';
import UserList from '../user-list/user-list';
import ProjectListContainer from '../project-list/project-list-container';
import NoteListContainer from '../note-list/note-list-container';

import EmptyMessage from './empty-message/empty-message';
import UserProfileSwitch from './user-profile-switch/user-profile-switch';
import Friends from './contexts/friends';

// actions
import {
  fetchFriendsForUser,
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
    friends,
    nav
  };

}

const mapDispatchToState = { fetchFriendsForUser, requestUser };

class UserProfile extends Component {
  
  static propTypes = {
    loggedInUser: PropTypes.string.isRequired,
    user: PropTypes.object,
    friends: PropTypes.array,
    nav: PropTypes.func.isRequired,
    fetchFriendsForUser: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.state = {
      context: 'latest',
      loadingContext: false
    };

    props.requestUser(props.user.userId, false);
  }

  fetchFriendsList () {
    return this.props.fetchFriendsForUser(this.props.user.userId)
      .then(() => this.setState({ loadingContext: false }));
  }

  renderLatest () {
    function selector (notes, user) {
      return Object.keys(notes)
        .map(id => notes[id])
        .filter(note => note.user === user);
    }

    return (
      <NoteListContainer
        onSelect={ id => this.props.nav('Note', { id }) }
        showContext={ this.props.user.userId === this.props.loggedInUser }
        query={[{ user: this.props.user.userId }]}
        selector={ notes => selector(notes, this.props.user.userId) }
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

    if (context === 'friends') {
      this.fetchFriendsList();
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
