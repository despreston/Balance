import { StyleSheet } from 'react-native';
import Colors from '../colors';

export default StyleSheet.create  ({

  reactions: {
    flexDirection: 'row'
  },

  iconContainer: {
    borderWidth: 1,
    borderRadius: 5,
    height: 25,
    paddingVertical: 2,
    paddingHorizontal: 3,
    borderColor: Colors.gray.porcelain,
    flexDirection: 'row',
    alignItems: 'center'
  },

  reaction: {
    marginLeft: 5
  },

  icon: {
    height: 17,
    width: 17
  },

  plus: {
    paddingRight: 3,
    color: Colors.gray.silver,
    fontSize: 10
  }

});
  