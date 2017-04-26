import { StyleSheet } from 'react-native';
import Colors from '../../../colors';

export default StyleSheet.create ({

  container: {
    backgroundColor: Colors.green,
    borderRadius: 5,
    height: 30,
    width: 140,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    fontWeight: '600',
    color: Colors.white
  }

});