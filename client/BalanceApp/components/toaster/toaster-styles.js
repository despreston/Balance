import { StyleSheet } from 'react-native';
import Colors from '../colors';
import Dimensions from 'Dimensions';

export default StyleSheet.create ({

  toaster: {
    margin: 5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.green,
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: 55,
    width: Dimensions.get('window').width-10
  },

  close: {
    position: 'absolute',
    top: -10,
    right: -10
  },

  closeBtn: {
    height: 30,
    width: 30
  }
  
});