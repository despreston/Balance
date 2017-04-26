import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create  ({

  flexRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  text: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600'
  },

  checkmark: {
    marginLeft: 5,
    height: 20,
    width: 20
  }

});