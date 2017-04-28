import { StyleSheet } from 'react-native';
import Colors from '../../../colors';

export default StyleSheet.create ({

  noteContext: {
    flexDirection: 'row',
    paddingTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray.porcelain
  },

  noteContextTextContainer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10
  },

  noteContextText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.gray.silver
  },

  selectedText: {
    color: Colors.purple,
    fontWeight: 'bold'
  },

  selectedNoteContext: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.purple
  }
  
});