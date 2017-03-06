// vendors
import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

// styles
import { Styles } from './note-list-item-style';

// tools
import { formatDate } from '../../utils/helpers';

// components
import EditButton from '../edit-button/edit-button';

function NoteListItem ({ note, onEdit, showProject, showType }) {

  function renderHeader () {
    let header = ''; 
    
    if (showType) {
      header += `${note.type === 'Past' ? 'Added to-do ' : 'Did work '}`;

      if (showProject) {
        header += `for ${showProject} at `;
      } else {
        header += 'at ';
      }
    } else if (showProject) {
      header += `${showProject} at `;
    }

    header += formatDate(note.createdAt);

    return header;
  }
  
  return (
    <View style={Styles.container}>
      <View style={Styles.top}>
        <Text style={Styles.createdAt}>
          { renderHeader() }
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
  showProject: PropTypes.bool,
  showType: PropTypes.bool
};

export default NoteListItem;