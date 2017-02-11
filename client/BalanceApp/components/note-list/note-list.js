// vendors
import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  ListView,
  TouchableHighlight
} from 'react-native';

// components
import NoteListItem from '../note-list-item/note-list-item';
import { Styles } from './note-list-style';

function NoteList ({ notes, onEdit }) {

  function renderNotes () {
    const notesById = Object.keys(notes);

    if (notesById.length === 0) {
      return ( <Text style={Styles.emptyText}>Tap 'To do next' to add a new entry.</Text> );
    }

    return notesById.map(id => {
      return (
        <View key={id} style={Styles.noteListItem}>
          <NoteListItem note={notes[id]} onEdit={onEdit} />
        </View>
      );
    });
  }
   
  return (
    <View>
      {renderNotes()}
    </View>
  );

}

NoteList.propTypes = {
  notes: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default NoteList;
