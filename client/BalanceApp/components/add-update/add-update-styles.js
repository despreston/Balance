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

  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },

  outsideContent: {
    padding: 8,
    justifyContent: 'space-between'
  },

  card: {
    marginHorizontal: 10,
    marginTop: 50,
    paddingBottom: 10
  },

  content: {
    borderRadius: 5,
    backgroundColor: Colors.purple
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
    fontSize: 14,
    fontWeight: '600'
  },

  subText: {
    ...defaultText,
    fontSize: 12.5
  },

  spacing: {
    marginLeft: 25
  }

});