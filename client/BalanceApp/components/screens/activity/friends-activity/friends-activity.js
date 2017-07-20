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
    this.onRefresh = this.onRefresh.bind(this);
    this.fetchActivity();
  }

  onEndReached () {
    if (!this.state.loading) {
      this.skip += this.limit;
      this.fetchActivity();
    }
  }

  fetchActivity () {
    this.props.dispatch(actions.fetchFriendActivity([{ skip: this.skip }]))
      .then(() => this.setState({ loading: false }));
  }

  onRefresh () {
    this.skip = 0;
    this.fetchActivity();
  }

  render () {
    const refreshProps = {
      refreshing: this.state.loading,
      onRefresh: this.onRefresh
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
