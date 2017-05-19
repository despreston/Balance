import React, { Component, PropTypes } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import actions from '../../../../actions';
import NoteListContainer from '../../../note-list/note-list-container';
import Refresh from '../../../refresh/refresh';

class FriendsActivity extends Component {

  static mapStateToProps ({ notes, loggedInUser, users }) {
    let friends = users[loggedInUser].friends
      .filter(f => f.status === 'accepted')
      .map(friend => friend.userId);

    // Grab the latest 20 notes
    notes = Object.keys(notes)
      .map(id => notes[id])
      .filter(note => friends.indexOf(note.author.userId) > -1)
      .sort((a,b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())
      .slice(0, 21);

    return { notes };
  }

  static propTypes = {
    notes: PropTypes.array,
    onSelect: PropTypes.func.isRequired
  }
  
  constructor (props) {
    super(props);
    this.state = { loading: true };
    this.fetchActivity();
  }

  fetchActivity () {
    this.props.dispatch(actions.fetchFriendActivity())
      .then(() => this.setState({ loading: false }));
  }

  render () {
    const refreshProps = {
      refreshing: this.state.loading,
      onRefresh: this.fetchActivity.bind(this)
    };

    return (
      <ScrollView
        refreshControl={ <Refresh { ...refreshProps } /> }
        keyboardShouldPersistTaps='handled'
      >
        <NoteListContainer
          showTypeText
          showUser
          showProjectName
          { ...this.props }
        />
      </ScrollView>
    );
  }
}

export default connect(FriendsActivity.mapStateToProps)(FriendsActivity);