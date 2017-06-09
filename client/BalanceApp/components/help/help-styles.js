import { StyleSheet } from 'react-native';
import Colors from '../colors';
import Dimensions from 'Dimensions';

export default StyleSheet.create  ({

  content: {
    backgroundColor: Colors.purple,
    paddingHorizontal: 30
  },

  close: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    height: 30,
    width: 100,
    borderRadius: 5,
    backgroundColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center'
  },

  topics: {
    paddingTop: 50,
    height: Dimensions.get('window').height
  },

  answer: {
    justifyContent: 'center',
    height: Dimensions.get('window').height
  },

  text: {
    lineHeight: 25,
    paddingBottom: 25,
    fontSize: 14,
    color: Colors.white
  },

  closeText: {
    color: Colors.white,
    fontWeight: 'bold'
  },

  topic: {
    paddingVertical: 5,
    marginBottom: 40,
    fontSize: 20,
    color: Colors.white,
    fontWeight: 'bold'
  },

  top: {
    height: 50,
    width: 50,
    position: 'absolute',
    right: 20,
    bottom: 10
  }

});