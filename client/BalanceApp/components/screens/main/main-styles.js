import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create  ({

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.white
  },

  start: {
    marginTop: 20,
    height: 40,
    width: 160,
    borderRadius: 5,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    left: 2,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 25,
    color: Colors.gray.tundora
  },

  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16
  }

});
