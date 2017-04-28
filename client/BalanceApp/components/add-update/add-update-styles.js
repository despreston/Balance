import { StyleSheet } from 'react-native';
import Colors from '../colors';

const defaultText = {
  color: Colors.white,
  textAlign: 'center'
};

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

  overlay: {
    backgroundColor: 'grey',
    opacity: 0.5
  },

  content: {
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 40,
    backgroundColor: Colors.purple
  },

  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },

  outsideContent: {
    padding: 10,
    justifyContent: 'space-between'
  },

  card: {
    height: 385
  },

  unimportantButton: {
    borderWidth: 1.5,
    borderColor: Colors.white,
    backgroundColor: Colors.purple
  },

  green: {
    backgroundColor: Colors.green
  },

  disabledGreen: {
    backgroundColor: '#4B4652'
  },

  disabledGreenText: {
    color: '#685575'
  },

  text: {
    ...defaultText,
    fontSize: 16,
    fontWeight: '600'
  },

  subText: {
    ...defaultText,
    fontSize: 14
  }

});