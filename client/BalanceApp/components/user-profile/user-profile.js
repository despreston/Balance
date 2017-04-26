import React, { Component, PropTypes } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// components
import ProfileInfo from './profile-info/profile-info';
import UserList from '../user-list/user-list';
import ProjectListContainer from '../project-list/project-list-container';
import NoteListContainer from '../note-list/note-list-container';
import UserProfileSwitch from './user-profile-switch/user-profile-switch';
import Refresh from '../refresh/refresh';

// actions
import actions from '../../actions/';

// styles
import Styles from './profile-styles';

class UserProfile extends Component {
  
  static propTypes = {
    loggedInUser: PropTypes.string.isRequired,
    user: PropTypes.object,
    userId: PropTypes.string.isRequired,
    friends: PropTypes.array,
    nav: PropTypes.func.isRequired
  };

  static mapStateToProps (state, ownProps) {
    let userId, nav, friends;

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

    if (user) {
      friends = Object.keys(state.users)
        .map(id => state.users[id])
        .filter(userToFilter => {
          return user.friends.some(friend => {
            return friend.userId === userToFilter.userId &&
              friend.status === 'accepted';
          });
        });
    } else {
      friends = [];
    }

    return {
      userId,
      loggedInUser: state.loggedInUser,
      user,
      friends,
      nav
    };
  }

  constructor (props) {
    super(props);

    this.state = {
      context: 'latest',
      loadingContext: false,
      refreshing: false
    };

    this.loadUser();

    this.userIsLoggedInUser = props.userId === props.loggedInUser;
  }

  loadUser () {
    return this.props.dispatch(actions.requestUser(this.props.userId, false));
  }

  fetchFriendsList () {
    return this.props.dispatch(actions.fetchFriendsForUser(this.props.userId))
      .then(() => this.setState({ loadingContext: false }));
  }

  renderLatest () {
    function selector (notes, user) {
      return Object.keys(notes)
        .map(id => notes[id])
        .filter(note => note.author.userId === user);
    }

    return (
      <NoteListContainer
        emptyState={ <EmptyLatest /> }
        onSelect={ id => this.props.nav('Note', { id }) }
        showProjectName
        showTypeText
        query={[{ user: this.props.userId }]}
        selector={ notes => selector(notes, this.props.userId) }
      />
    );
  }

  renderFriends () {
    const addFriend = this.userIsLoggedInUser
      ? () => this.props.nav('UserSearch')
      : null;

    return (
      <UserList
        emptyState={ <EmptyFriends addFriend={ addFriend }/> }
        users={ this.props.friends }
        onUserSelect={ userId => this.props.nav('UserProfile', { userId }) }
      />
    );
  }

  renderProjects () {
    const { nav, userId } = this.props;

    return (
      <ProjectListContainer
        emptyState={ <EmptyProjects addProject={ () => this.props.nav('EditProject') }/> }
        onProjectTap={ project => nav('Project', { project: project._id }) }
        user={ userId }
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

  refresh () {
    this.setState({ refreshing: true });

    this.loadUser().then(() => this.setState({ refreshing: false }));
  }

  render () {
    if (!this.props.user) {
      return <Text>Loading...</Text>;
    }

    const refreshProps = {
      refreshing: this.state.refreshing,
      onRefresh: () => this.refresh()
    };

    return (
      <ScrollView style={ Styles.profile } refreshControl={ <Refresh { ...refreshProps } /> }>
        <View style={ Styles.profileInfo }>
          <ProfileInfo
            user={ this.props.user }
            showEmptyBio={ this.userIsLoggedInUser }
            addBio={ () => this.props.nav('UserSettings') }
          />
          <UserProfileSwitch
            user={ this.props.user }
            hideProjects={ this.userIsLoggedInUser }
            selectedContext={ this.state.context }
            switchContext={ (context) => this.switchContext(context) }
          />
        </View>
        <View style={ Styles.body }>
          { this.renderBody() }
        </View>
      </ScrollView>
    );
  }

}

const EmptyLatest = () => {
  return <Text style={ Styles.emptyText }>No updates yet 😕</Text>;
};

const EmptyFriends = ({ addFriend }) => {
  if (addFriend) {
    return (
      <View style={ Styles.center }>
        <Text style={ Styles.emptyText }>No friends yet. 😕</Text>
        <TouchableOpacity onPress={ addFriend } style={ Styles.findFriends }>
          <Text style={ Styles.findFriendsText }>Find friends</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return <Text style={ Styles.emptyText }>No friends yet. 😕</Text>;
};

const EmptyProjects = () => {
  return <Text style={ Styles.emptyText }>No projects yet. 😕</Text>;
};

export default connect(UserProfile.mapStateToProps)(UserProfile);
