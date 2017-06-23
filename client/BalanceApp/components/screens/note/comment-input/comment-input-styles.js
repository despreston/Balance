import { StyleSheet } from 'react-native';
import Colors from '../../../colors';

export default StyleSheet.create ({

  container: {
    backgroundColor: Colors.gray.porcelain,
    paddingHorizontal: 10
  },

  replyingTo: {
    marginTop: 10,
    color: Colors.gray.tundora,
    opacity: 0.7,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  inputContainer: {
    alignItems: 'center',
    height: 50,
    flexDirection: 'row'
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.gray.tundora,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.white
  },

  send: {
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 16
  },

  valid: {
    color: Colors.blue
  },

  invalid: {
    color: Colors.gray.silver
  }

});