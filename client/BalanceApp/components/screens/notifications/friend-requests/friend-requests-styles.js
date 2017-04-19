import { StyleSheet } from 'react-native';
import Colors from '../../../colors';

export default StyleSheet.create ({

  flexRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  text: {
    color: Colors.gray.tundora
  },

  friendRequests: {
    height: 60,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 5,
    borderBottomColor: Colors.gray.porcelain
  }

});