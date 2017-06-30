import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create ({

  container: {
    backgroundColor: Colors.gray.porcelain,
    alignItems: 'center'
  },

  editAvatar: {
    marginBottom: 20
  },

  avatar: {
    marginTop: 30,
    marginBottom: 5,
    width: 60,
    height: 60,
    borderRadius: 30
  },

  error: {
    color: Colors.red
  },

  centerText: {
    textAlign: 'center'
  },

  readOnlyText: {
    color: Colors.gray.silver
  }

});
