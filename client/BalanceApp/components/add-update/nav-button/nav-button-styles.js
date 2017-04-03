import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create  ({

  navButton: {
    flex: 1,
    height: 30,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    color: Colors.white,
    fontWeight: 'bold'
  }

});