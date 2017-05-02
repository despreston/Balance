import { StyleSheet } from 'react-native';
import Colors from '../../../colors';

export default StyleSheet.create ({

  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.purple
  },

  friendRequests: {
    height: 65,
    justifyContent: 'space-between',
    paddingLeft: 18,
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