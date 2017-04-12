import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create  ({

  count: {
    textAlign: 'center',
    fontSize: 12,
    paddingLeft: 3,
    color: Colors.gray.silver
  },

  selectedContainer: {
    borderColor: 'rgba(67, 43, 82, 0.5)'
  },

  selectedCount: {
    color: 'rgba(67, 43, 82, 0.5)'
  }

});