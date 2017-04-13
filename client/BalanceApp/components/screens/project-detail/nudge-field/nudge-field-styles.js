import { StyleSheet } from 'react-native';
import Colors from '../../../colors';

export default StyleSheet.create ({
  
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.gray.porcelain,
    justifyContent: 'center'
  },

  nudges: {
    flex: 1
  },

  center: {
    alignItems: 'center'
  },

  emptyText: {
    color: Colors.gray.tundora,
    fontSize: 13
  },

  button: {
    alignItems: 'center',
    width: 50
  }

});