import { StyleSheet } from 'react-native';
import Colors from '../colors';

export default StyleSheet.create  ({

  reactions: {
    flexDirection: 'row'
  },

  iconContainer: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
    borderColor: Colors.gray.porcelain,
    flexDirection: 'row',
    alignItems: 'center'
  },

  reaction: {
    marginLeft: 5
  },

  count: {
    textAlign: 'center',
    fontSize: 12,
    paddingLeft: 3,
    color: Colors.gray.silver
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
  