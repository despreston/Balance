import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create ({

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 10,
    alignSelf: 'center'
  },

  overlay: {
    borderRadius: 7,
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    opacity: 0.7,
    backgroundColor: Colors.purple
  },

  text: {
    color: Colors.white,
    fontSize: 18
  }

});