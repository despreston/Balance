import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create  ({

  container: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: Colors.purple
  },

  picture: {
    borderRadius: 5,
    height: 300
  },

  placeholder: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  placeholderImage: {
    opacity: 0.2
  },

  placeholderText: {
    color: Colors.white,
    opacity: 0.6
  },

  contentContainer: {
    flex: 1,
    padding: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: Colors.white,
  },

  content: {
    flex: 1
  }

});