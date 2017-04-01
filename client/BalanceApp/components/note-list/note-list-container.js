// vendors
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

// components
import NoteList from './note-list';
import EditNote from '../edit-note/edit-note';

// actions
import { requestNotes, saveNote } from '../../actions';

function mapStateToProps (state, ownProps) {

  /**
   * Optionally, if no query is given, notes can manually be given to 
   * NoteListContainer. If a query is given, notes will be requested from the
   * server.
   */
  const notes = ownProps.query ? ownProps.selector(state.notes) : ownProps.notes;

  return { notes }
}

const mapDispatchToProps = { requestNotes, saveNote };

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
    selector: PropTypes.func,

    // function to exec when edit button is selected. if null, no edit btn is shown
    showEdit: PropTypes.bool,

    // comes from redux
    saveNote: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);

    this.state = { note: {}, editModalVisible: false };

    props.query && props.requestNotes(props.query);
  }

  onEdit (note) {
    this.setState({ note, editModalVisible: true });
  }

  onClose () {
    this.setState({ note: {}, editModalVisible: false });
  }

  render () {
    const {
      onSelect,
      notes,
      showContext = false,
      showEdit
    } = this.props;

    return (
      <View>
        <NoteList
          showEdit={ showEdit }
          onEdit={ note => this.onEdit(note) }
          onSelect={ onSelect }
          showContext={ showContext }
          notes={ notes }
        />
        {
          showEdit &&
          <EditNote
            note={ this.state.note }
            onSave={ note => this.props.saveNote(note) }
            onClose={ () => this.onClose() }
            visible={ this.state.editModalVisible }
          />
        }
      </View>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(NoteListContainer);
