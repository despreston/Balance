import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create  ({

  container: {
    position: 'absolute',
    top: -3,
    right: -10,
    backgroundColor: Colors.red,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  count: {
    width: 15,
    fontSize: 11,
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold'
  }

});