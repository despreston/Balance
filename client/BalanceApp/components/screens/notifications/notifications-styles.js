import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create ({

  notifications: {
    backgroundColor: Colors.white,
    flex: 1
  },

  container: {
    height: Dimensions.get('window').height - 80,
    justifyContent: 'center',
    alignItems: 'center'
  },

  emptyText: {
    color: Colors.gray.tundora,
    fontSize: 22
  }

});