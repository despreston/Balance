import React, { Component, PropTypes } from 'react';
import NoteList from '../../note-list/note-list-container';
import EmptyMessage from '../empty-message/empty-message';

function Notes ({ notes, nav, name }) {

  if (notes.length > 0) {
    return (
      <NoteList
        onSelect={ id => nav('Note', { id })}
        notes={ notes }
        showContext={true} />
    );
  }
  return (
    <EmptyMessage
      message={ `${name} hasn't posted any notes yet.` }
    />
  );
};

Notes.propTypes = {
  notes: PropTypes.array.isRequired,
  nav: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default Notes;