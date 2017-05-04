import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../../actions';
import NoteListContainer from '../../../note-list/note-list-container';

class FriendsActivity extends Component {

  static mapStateToProps ({ notes }) {
    // Grab the latest 20 notes
    notes = Object.keys(notes)
      .map(id => notes[id])
      .sort((a,b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())
      .slice(0, 21);

    return { notes };
  }
  
  constructor (props) {
    super(props);
    this.fetchActivity();
  }

  fetchActivity () {
    this.props.dispatch(actions.fetchFriendActivity());
  }

  render () {
    return (
      <NoteListContainer
        showTypeText
        showUser
        showProjectName
        { ...this.props }
      />
    );
  }

}

export default connect(FriendsActivity.mapStateToProps)(FriendsActivity);