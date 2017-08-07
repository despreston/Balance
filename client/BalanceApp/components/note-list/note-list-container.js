import React, { Component, PropTypes } from 'react';
import { connect }                     from 'react-redux';
import NoteList                        from './note-list';
import actions                         from '../../actions/';

class NoteListContainer extends Component {

  static propTypes = {
    // function to exec when note is selected
    onSelect: PropTypes.func.isRequired,

    // show the project title in note list items
    showProjectName: PropTypes.bool,

    // show the type text 'todo' or 'did work'
    showTypeText: PropTypes.bool,

    showUser: PropTypes.bool,
    notes: PropTypes.array.isRequired,
    emptyState: PropTypes.object,
    onEndReached: PropTypes.func,
    onRefresh: PropTypes.func,
    refreshing: PropTypes.bool
  }

  constructor (props) {
    super(props);
    this.limit = 30;
    this.skip = 0;
    this.onEndReached = this.onEndReached.bind(this);
  }

  onEndReached () {
    // Haven't hit the scroll limit. no need to load more
    if (this.props.notes.length < this.limit) {
      return;
    }

    if (this.props.onEndReached) {
      return this.props.onEndReached();
    }

    const query = [
      { limit: this.limit },
      { skip: this.limit + this.skip }
    ];

    this.requestNotes(query);
  }

  requestNotes (query) {
    this.props.dispatch(actions.requestNotes(query));
  }

  render () {
    const {
      onSelect,
      notes,
      showProjectName,
      emptyState,
      showTypeText,
      showUser,
      onRefresh,
      refreshing
    } = this.props;

    if (emptyState && notes.length < 1) {
      return emptyState;
    }

    return (
      <NoteList
        onEndReached={ this.onEndReached }
        {...{
          refreshing,
          onRefresh,
          onSelect,
          showUser,
          showTypeText,
          showProjectName,
          notes
        } }
      />
    );
  }

}

export default connect(NoteListContainer.mapStateToProps)(NoteListContainer);
