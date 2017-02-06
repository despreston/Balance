// Vendors
import React, { PropTypes } from 'react';
import {
  Text,
  View
} from 'react-native';

// Components
import { Style } from './future-note-style';

function FutureNote ({ note }) {
  function formatDate (date) {
    return date.toLocaleDateString([], {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  return (
    <View style={Style.container}>
      <View style={Style.top}>
        <Text style={Style.title}>Up next</Text>
        {
          note.lastUpdated &&
          <Text style={Style.date}>Added {formatDate(note.lastUpdated)}</Text>
        }
      </View>
      <Text style={Style.content}>{note.content}</Text>
    </View>
  );
}

FutureNote.propTypes = {
  note: PropTypes.shape({
    content: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    lastUpdated: PropTypes.date
  }).isRequired
};

export default FutureNote;