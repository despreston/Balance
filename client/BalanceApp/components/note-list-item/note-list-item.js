// vendors
import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

// styles
import { Styles } from './note-list-item-style';

// tools
import { formatDate } from '../../utils/helpers';

// components
import EditButton from '../edit-button/edit-button';

function NoteListItem ({ note, onEdit, showContext }) {

  function renderHeader () {
    if (!showContext) { return; }

    let typeText = `${note.type === 'Past' ? 'Added to-do ' : 'Did work '}`;

    return (
      <Text>
        <Text style={Styles.darker}>{ typeText }</Text>
        <Text style={Styles.dark}>for </Text>
        <Text style={Styles.darker}>{ note.project.name } </Text>
      </Text>
    );
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.top}>
        <Text style={Styles.createdAt}>
          { renderHeader() }
          { formatDate(note.createdAt) }
        </Text>
        {
          onEdit && 
          <EditButton
            onEdit={onEdit.bind(this, note)}
            style={Styles.editButton} />
        }
      </View>
      <Text style={Styles.content}>{note.content}</Text>
    </View>
  );
}

NoteListItem.propTypes = {
  note: PropTypes.shape({
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired
  }).isRequired,
  onEdit: PropTypes.func,
  showContext: PropTypes.bool
};

export default NoteListItem;