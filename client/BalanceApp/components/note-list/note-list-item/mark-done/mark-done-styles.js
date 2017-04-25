import { StyleSheet } from 'react-native';
import Colors from '../../../colors';

export default StyleSheet.create  ({

  container: {
    borderWidth: 1,
    borderRadius: 5,
    height: 25,
    paddingHorizontal: 6,
    borderColor: Colors.gray.porcelain,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5
  },

  icon: {
    height: 20,
    width: 20
  }

});
  