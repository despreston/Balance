import React, { Component, PropTypes } from 'react';
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
      .sort((a,b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());

    return { notes };
  }

  static propTypes = {
    notes: PropTypes.array,
    onSelect: PropTypes.func.isRequired
  }
  
  constructor (props) {
    super(props);
    this.skip = 0;
    this.limit = 30;
    this.state = { loading: true };
    this.onEndReached = this.onEndReached.bind(this);
    this.fetchActivity();
  }

  onEndReached () {
    // Haven't hit the scroll limit. no need to load more
    if (this.props.notes.length < this.limit) return;

    if (!this.state.loading) {
      this.skip += this.limit;
      this.fetchActivity();
    }
  }

  fetchActivity () {
    this.props.dispatch(actions.fetchFriendActivity([{ skip: this.skip }]))
      .then(() => this.setState({ loading: false }));
  }

  render () {
    const refreshProps = {
      refreshing: this.state.loading,
      onRefresh: this.fetchActivity.bind(this)
    };

    return (
      <NoteListContainer
        onEndReached={ this.onEndReached }
        refreshControl={ <Refresh { ...refreshProps } /> }
        showTypeText
        showUser
        showProjectName
        { ...this.props }
      />
    );
  }
}

export default connect(FriendsActivity.mapStateToProps)(FriendsActivity);