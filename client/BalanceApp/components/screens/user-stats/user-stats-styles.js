import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create ({

  userStats: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: Colors.white
  },

  stats: {
    flex: 1,
    paddingHorizontal: 10
  },

  stat: {
    marginBottom: 30
  },

  text: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '300'
  }

});
