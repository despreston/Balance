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

    // array of key/value query params to use with requestNotes
    query: PropTypes.array,

    // selector to use when getting notes from redux
    // @param {object} notes from redux state
    // @return {array}
    selector: PropTypes.func,

    // function to call when end of the list is reached
    onEndReached: PropTypes.func,

    // function to use for pull-to-refresh
    onRefresh: PropTypes.func,

    refreshing: PropTypes.bool
  }

  static mapStateToProps (state, ownProps) {
    /**
     * Optionally, if no query is given, notes can manually be given to
     * NoteListContainer. If a query is given, notes will be requested from the
     * server.
     */
    const notes = ownProps.query
      ? ownProps.selector(state.notes)
      : ownProps.notes;

    return { notes };
  }

  constructor (props) {
    super(props);

    this.limit = props.query && props.query.limit ? props.query.limit : 30;
    this.skip = props.query && props.query.skip ? props.query.skip : 0;
    this.onEndReached = this.onEndReached.bind(this);

    if (props.query) {
      this.requestNotes(props.query);
    }
  }

  onEndReached () {
    // Haven't hit the scroll limit. no need to load more
    if (this.props.notes.length < this.limit) return;

    if (this.props.onEndReached) return this.props.onEndReached();

    let query = this.props.query ? Array.from(this.props.query) : [];

    query.push({ limit: this.limit });
    query.push({ skip: this.limit + this.skip });

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
