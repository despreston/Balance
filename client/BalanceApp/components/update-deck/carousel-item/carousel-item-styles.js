import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create  ({

  container: {
    flex: 1,
    borderRadius: 5
  },

  picture: {
    borderRadius: 5,
    height: 400
  },

  placeholder: {
    backgroundColor: Colors.purple,
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
    bottom: 110,
    height: 110,
    padding: 10
  },

  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: Colors.black,
    opacity: 0.2,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5
  },

  content: {
    color: Colors.white,
    flex: 1,
    lineHeight: 19
  },

  date: {
    color: Colors.white,
    fontStyle: 'italic',
    paddingBottom: 3
  }

});