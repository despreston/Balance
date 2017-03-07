import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

// components
import ProfileInfo from './profile-info/profile-info';
import NoteList from '../note-list/note-list';
import UserList from '../user-list/user-list';

// actions
import { fetchFriendsForUser, requestNotes } from '../../actions';

// styles
import Styles from './profile-styles';

function mapStateToProps (state, ownProps) {
  
  const user = state.users[ownProps.userId];
  delete ownProps.userId;

  // latest notes for user
  const latestNotes = Object.keys(state.notes)
    .map(id => state.notes[id])
    .filter(note => note.user === ownProps.userId);

  const friends = Object.keys(state.users)
    .map(id => state.users[id])
    .filter(userToFilter => user.friends.indexOf(userToFilter.userId) > -1);

  return {
    user: state.users[ownProps.userId],
    latestNotes,
    friends
  };

}

function mapDispatchToState (dispatch) {
  return {
    requestLatestNotes: params => dispatch(requestNotes(params)),
    fetchFriendsForUser: id => dispatch(fetchFriendsForUser(id))
  };
}

class UserProfile extends Component {
  
  static propTypes = {
    user: PropTypes.object.isRequired,
    latestNotes: PropTypes.array.isRequired,
    friends: PropTypes.array.isRequired,
    requestLatestNotes: PropTypes.func.isRequired,
    fetchFriendsForUser: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.state = { context: 'latest', loadingContext: false };
    this.fetchLatestList();
  }

  fetchFriendsList () {
    this.props.fetchFriendsForUser(this.props.user.userId).then(() => {
      this.setState({ loadingContext: false });
    });
  }

  fetchLatestList () {
    this.props.requestLatestNotes([{ user: this.props.user.userId }])
      .then(() => { 
        this.setState({ loadingContext: false });
      });
  }

  renderBody () {
    if (this.state.loadingContext) {
      return <Text>loading...</Text>;
    }

    switch (this.state.context) {
      case 'latest':
        return (
          <NoteList
            notes={this.props.latestNotes}
            showContext={true} />
        );
      case 'friends':
        return <UserList users={this.props.friends} />;
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

  render () {
    return (
      <View style={ Styles.profile }>
        <View style={ Styles.profileInfo }>
          <ProfileInfo
            user={ this.props.user }
            hideProjects={true}
            switchContext={ (context) => this.switchContext(context) }/>
        </View>
        <View>
          { this.renderBody() }
        </View>
      </View>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToState)(UserProfile);

