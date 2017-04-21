// Vendors
import React, { PropTypes } from 'react';
import {
  Text,
  View
} from 'react-native';

// Components
import { Style } from './future-note-style';

// Tools
import { formatDate } from '../../../../utils/helpers';

function FutureNote ({ note }) {
  function renderContent () {
    if (note.content) {
      return ( <Text style={Style.content}>{note.content}</Text> );
    }
    return (
      <Text style={[Style.content, Style.center]}>
        Nothing planned for this project.
      </Text> 
    );
  }

  return (
    <View style={Style.container}>
      <View style={Style.top}>
        <Text style={Style.title}>Next Time</Text>
        {
          note.lastUpdated &&
          <Text style={Style.date}>Added {formatDate(note.lastUpdated)}</Text>
        }
      </View>
      { renderContent() }
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