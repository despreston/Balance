import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create ({

  container: {
    flex: 1,
    backgroundColor: Colors.gray.porcelain,
    alignItems: 'center'
  },

  avatar: {
    marginTop: 30,
    marginBottom: 5,
    width: 60,
    height: 60,
    borderRadius: 30
  }

});