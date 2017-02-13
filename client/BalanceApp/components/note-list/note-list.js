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
    if (notes.length === 0) {
      return (
        <Text style={Styles.emptyText}>
          Tap 'To do next' to add a new entry.
        </Text>
      );
    }

    return notes.map(note => {
      return (
        <View key={note._id} style={Styles.noteListItem}>
          <NoteListItem note={note} onEdit={onEdit} />
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
  notes: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default NoteList;
