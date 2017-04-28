// vendors
import React, { PropTypes } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

// components
import NoteListItem from './note-list-item/note-list-item';
import { Styles } from './note-list-style';

function NoteList ({ notes, showProjectName, onSelect, showTypeText }) {

  notes.sort((a,b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());

  function renderNotes () {

    return notes.map(note => {
      return (
        <TouchableOpacity
          key={ note._id }
          style={ Styles.noteListItem }
          onPress={ () => onSelect(note._id) }>
          <NoteListItem
            note={ note }
            showTypeText={ showTypeText }
            showProjectName={ showProjectName } />
        </TouchableOpacity>
      );
    });

  }

  return (
    <ScrollView>
      { renderNotes() }
    </ScrollView>
  );

}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  showProjectName: PropTypes.bool,
  showTypeText: PropTypes.bool,
  onSelect: PropTypes.func.isRequired
};

export default NoteList;
