import { StyleSheet } from 'react-native';
import Colors from '../colors';

export default StyleSheet.create  ({

  button: {
    borderRadius: 5,
    backgroundColor: Colors.blue
  },

  container: {
    height: 25,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center'
  },

  addText: {
    color: Colors.white
  },

  text: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white
  }
  
});