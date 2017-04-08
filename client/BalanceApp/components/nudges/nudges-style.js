import { StyleSheet } from 'react-native';
import Colors from '../colors';

export default StyleSheet.create({

  nudges: {
    overflow: 'hidden',
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },

  picture: {
    borderWidth: 0.7,
    borderColor: Colors.white,
    width: 25,
    height: 25,
    borderRadius: 12.5,
  },

  text: {
    color: Colors.gray.silver,
    fontSize: 12
  }

});