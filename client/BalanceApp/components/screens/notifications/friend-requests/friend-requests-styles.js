import { StyleSheet } from 'react-native';
import Colors from '../../../colors';

export default StyleSheet.create ({

  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    color: Colors.gray.tundora
  },

  friendRequests: {
    height: 65,
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 10,
    borderBottomWidth: 10,
    borderBottomColor: Colors.gray.porcelain
  },

  forward: {
    marginLeft: 5,
    height: 17,
    width: 17
  }

});