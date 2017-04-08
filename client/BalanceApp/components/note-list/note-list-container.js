// vendors
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

// components
import NoteList from './note-list';

// actions
import { requestNotes } from '../../actions';

function mapStateToProps (state, ownProps) {

  /**
   * Optionally, if no query is given, notes can manually be given to 
   * NoteListContainer. If a query is given, notes will be requested from the
   * server.
   */
  const notes = ownProps.query ? ownProps.selector(state.notes) : ownProps.notes;

  return { notes }
}

const mapDispatchToProps = { requestNotes };

class NoteListContainer extends Component {

  static propTypes = {

    // function to exec when note is selected
    onSelect: PropTypes.func.isRequired,

    // show the project title and note type
    showContext: PropTypes.bool,

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

  constructor (props) {
    super(props);

    props.query && props.requestNotes(props.query);
  }

  render () {
    const {
      onSelect,
      notes,
      showContext = false
    } = this.props;

    return (
      <NoteList
        onSelect={ onSelect }
        showContext={ showContext }
        notes={ notes }
      />
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(NoteListContainer);
