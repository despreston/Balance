import { StyleSheet } from 'react-native';
import Colors from '../../../colors';

export default StyleSheet.create ({

  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    backgroundColor: Colors.gray.porcelain
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: Colors.gray.tundora,
    marginLeft: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.white,
  },

  send: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.blue
  }

});