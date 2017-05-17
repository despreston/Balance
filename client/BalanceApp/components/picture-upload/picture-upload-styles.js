import { StyleSheet } from 'react-native';
import Colors from '../colors';

export default StyleSheet.create  ({

  modal: {
    backgroundColor: Colors.purple,
    paddingVertical: 30,
    flex: 1
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

  closeText: {
    color: Colors.white,
    fontWeight: 'bold'
  }

});