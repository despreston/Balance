import { StyleSheet } from 'react-native';
import Colors from '../colors';

export default StyleSheet.create  ({

  center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    fontWeight: 'bold',
    color: Colors.purple
  },

  container: {
    paddingVertical: 10
  }

});
