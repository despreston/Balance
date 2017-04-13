import { StyleSheet } from 'react-native';
import Colors from '../../../colors';

export default StyleSheet.create  ({

  container: {
    borderWidth: 1,
    borderRadius: 5,
    height: 25,
    paddingHorizontal: 3,
    borderColor: Colors.gray.porcelain,
    flexDirection: 'row',
    alignItems: 'center'
  },

  countContainer: {
    justifyContent: 'center',
    paddingLeft: 3
  },

  count: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.gray.silver
  },

  icon: {
    height: 17,
    width: 17
  }

});
  