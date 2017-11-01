import { StyleSheet } from 'react-native';
import Colors from '../../../colors';

export default StyleSheet.create ({

  stat: {
    justifyContent: 'center',
    height: 80,
    paddingHorizontal: 16,
    borderWidth: 3,
    borderRadius: 8,
    borderColor: Colors.blue
  },

  description: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '700',
    color: Colors.gray.tundora
  }

});
