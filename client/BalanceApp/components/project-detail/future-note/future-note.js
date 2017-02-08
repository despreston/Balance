// Vendors
import React, { PropTypes } from 'react';
import {
  Text,
  View
} from 'react-native';

// Components
import { Style } from './future-note-style';

// Tools
import { formatDate } from '../../../middleware/helpers';

function FutureNote ({ note }) {
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