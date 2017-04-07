import { StyleSheet } from 'react-native';
import Colors from '../../../colors';

export default StyleSheet.create  ({

  container: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 4,
    padding: 2,
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
  