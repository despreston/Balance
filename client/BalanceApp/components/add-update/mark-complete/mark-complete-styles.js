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

  box: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.white,
    marginRight: 5
  },

  checkmark: {
    marginRight: 5,
    height: 20,
    width: 20
  }

});