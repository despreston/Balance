import { StyleSheet } from 'react-native';

export default StyleSheet.create  ({

  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },

  flex: {
    flex: 1
  },

  center: {
    justifyContent: 'center'
  },

  overlay: {
    backgroundColor: 'grey',
    opacity: 0.5
  },

  content: {
    height: 400
  }

});