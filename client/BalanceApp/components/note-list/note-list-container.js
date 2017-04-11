// vendors
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

// components
import NoteList from './note-list';

// actions
import { requestNotes } from '../../actions';

class NoteListContainer extends Component {

  static propTypes = {
    // function to exec when note is selected
    onSelect: PropTypes.func.isRequired,

    // show the project title in note list items
    showProjectName: PropTypes.bool,

    // comes from redux
    requestNotes: PropTypes.func.isRequired,

    notes: PropTypes.array.isRequired,

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
      this.requestNotes();
    }
  }

  requestNotes () {
    this.props.requestNotes(this.props.query).then(() => {
      this.setState({ loading: false });
    });
  }

  render () {
    if (this.state.loading) { return null; }

    const {
      onSelect,
      notes,
      showProjectName = false
    } = this.props;

    return (
      <NoteList
        onSelect={ onSelect }
        showProjectName={ showProjectName }
        notes={ notes }
      />
    );
  }

}

export default connect(NoteListContainer.mapStateToProps, { requestNotes })(NoteListContainer);
