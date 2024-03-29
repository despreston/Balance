import { StyleSheet } from 'react-native';
import Colors from '../../../colors';

export default StyleSheet.create ({

  container: {
    padding: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.gray.porcelain,
    justifyContent: 'center'
  },

  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10
  },

  center: {
    alignItems: 'center'
  },

  emptyText: {
    textAlign: 'center',
    color: Colors.purple,
    fontWeight: '600',
    fontSize: 13
  }

});
