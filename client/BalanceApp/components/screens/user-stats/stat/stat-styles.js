import { StyleSheet } from 'react-native';
import Colors from '../../../colors';

export default StyleSheet.create ({

  stat: {
    flexDirection: 'row',
    height: 80,
    paddingHorizontal: 16,
    borderWidth: 3,
    borderRadius: 8,
    borderColor: Colors.blue,
    alignItems: 'center'
  },

  icon: {
    width: 40,
    height: 40,
    marginRight: 30
  },

  description: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600',
    color: Colors.gray.tundora
  }

});
