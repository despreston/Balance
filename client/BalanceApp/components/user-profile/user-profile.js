import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import ProfileInfo from './profile-info/profile-info';
import UserList from '../user-list/user-list';
import ProjectListContainer from '../project-list/project-list-container';
import NoteList from '../note-list/note-list';
import UserProfileSwitch from './user-profile-switch/user-profile-switch';
import Refresh from '../refresh/refresh';
import actions from '../../actions/';
import Styles from './profile-styles';
import { api } from '../../utils/api';

class UserProfile extends Component {

  static propTypes = {
    loggedInUser: PropTypes.string.isRequired,
    user: PropTypes.object,
    userId: PropTypes.string.isRequired,
    nav: PropTypes.func.isRequired,
    notes: PropTypes.array.isRequired
  }

  static mapStateToProps (state, ownProps) {
    let userId, nav, user, notes;

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

    user = state.users[userId];

    notes = Object.values(state.notes)
      .filter(note => note.author.userId === userId)
      .sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());

    return {
      userId,
      loggedInUser: state.loggedInUser,
      user,
      nav,
      notes
    };
  }

  constructor (props) {
    super(props);

    this.state = {
      context: 'latest',
      loadingContext: false,
      refreshing: false,
      friends: []
    };

    this.onBookmarksPress = this.onBookmarksPress.bind(this);
    this.onStatsPress = this.onStatsPress.bind(this);
    this.userIsLoggedInUser = props.userId === props.loggedInUser;

    this.fetchNotes();
    this.loadUser();
  }

  loadUser () {
    return this.props.dispatch(actions.requestUser(this.props.userId, false));
  }

  async fetchFriendsList () {
    let friends = await api(`users/${this.props.userId}/friends?status=accepted`);

    this.setState({
      friends,
      loadingContext: false
    });
  }

  fetchNotes () {
    return this.props.dispatch(actions.requestNotes([ { user: this.props.userId } ]));
  }

  onBookmarksPress () {
    this.props.nav('UserBookmarks', { user: this.props.userId });
  }

  onStatsPress () {
    this.props.nav('UserStats', { user: this.props.userId });
  }

  renderLatest () {
    if (this.props.notes.length < 1) {
      return <EmptyLatest />;
    }

    return (
      <NoteList
        onEndReached={ () => null }
        showProjectName
        showTypeText
        notes={ this.props.notes }
        onSelect={ id => this.props.nav('Note', { id }) }
      />
    )
  }

  renderFriends () {
    const addFriend = this.userIsLoggedInUser
      ? () => this.props.nav('UserSearch')
      : null;

    return (
      <UserList
        emptyState={ <EmptyFriends addFriend={ addFriend } /> }
        users={ this.state.friends }
        onUserSelect={ userId => this.props.nav('UserProfile', { userId }) }
      />
    );
  }

  renderProjects () {
    const { nav, userId } = this.props;
    const addProject = () => this.props.nav('EditProject');
    const onProjectTap = project => nav('Project', { project: project._id });

    return (
      <ProjectListContainer
        emptyState={ <EmptyProjects addProject={ addProject } /> }
        onProjectTap={ onProjectTap }
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

  async refresh () {
    this.setState({ refreshing: true });
    await this.loadUser();
    await this.fetchNotes();
    this.setState({ refreshing: false });
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
      <ScrollView
        style={ Styles.profile }
        refreshControl={ <Refresh { ...refreshProps } /> }
      >
        <View style={ Styles.profileInfo }>
          <ProfileInfo
            onStatsPress={ this.onStatsPress }
            onBookmarksPress={ this.onBookmarksPress }
            user={ this.props.user }
          />
          <UserProfileSwitch
            userId={ this.props.user.userId }
            selectedContext={ this.state.context }
            switchContext={ (context) => this.switchContext(context) }
          />
        </View>
        { this.renderBody() }
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
