import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create  ({

  explore: {
    paddingVertical: 8,
    backgroundColor: Colors.white
  },

  heading: {
    color: Colors.gray.tundora,
    fontSize: 22,
    fontWeight: '500',
    paddingBottom: 16,
    paddingHorizontal: 16
  },

  separator: {
    backgroundColor: Colors.gray.silver,
    opacity: 0.5,
    height: 1,
    marginHorizontal: 16,
    marginVertical: 8
  }

});
