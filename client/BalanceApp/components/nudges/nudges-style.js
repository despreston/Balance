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
    borderWidth: 0.5,
    borderColor: Colors.gray.silver
  },

  bold: {
    fontWeight: '800'
  },

  text: {
    color: Colors.gray.silver,
    fontSize: 12
  }

});