import { StyleSheet } from 'react-native';
import Colors from '../colors';

export default StyleSheet.create({

  nudges: {
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },

  picture: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
  },

  bold: {
    fontWeight: '600',
    color: Colors.purple
  },

  text: {
    color: Colors.gray.silver,
    fontSize: 12
  }

});