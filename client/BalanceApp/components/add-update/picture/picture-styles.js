import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create({

  container: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5
  },

  remove: {
    position: 'absolute',
    right: -15,
    top: -10
  },

  removeIcon: {
    height: 35,
    width: 35
  },

  picture: {
    width: 160,
    height: 120
  }

});