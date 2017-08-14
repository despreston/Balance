import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create  ({

  count: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.gray.silver
  },

  selectedContainer: {
    borderWidth: 1.5,
    borderColor: 'rgba(67, 43, 82, 0.5)'
  },

  selectedCount: {
    color: 'rgba(67, 43, 82, 0.5)'
  }

});
