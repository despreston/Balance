// vendors
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// components
import NoteList from './note-list';

// actions
import actions from '../../actions/';

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
    selector: PropTypes.func
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

    this.state = { loading: !!props.query };

    if (props.query) {
      this.requestNotes(props.query);
    }
  }

  requestNotes (query) {
    this.props.dispatch(actions.requestNotes(query)).then(() => {
      this.setState({ loading: false });
    });
  }

  render () {
    if (this.state.loading) { return null; }

    const {
      onSelect,
      notes,
      showProjectName,
      emptyState,
      showTypeText,
      showUser
    } = this.props;

    if (emptyState && notes.length < 1) {
      return emptyState;
    }

    return (
      <NoteList
        {...{ onSelect, showUser, showTypeText, showProjectName, notes } }
      />
    );
  }

}

export default connect(NoteListContainer.mapStateToProps)(NoteListContainer);
