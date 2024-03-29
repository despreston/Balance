import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create  ({

  editProject: {
    backgroundColor: Colors.white,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  formContainer: {
    flex: 1
  },

  text: {
    color: Colors.gray.tundora,
    fontSize: 15,
    lineHeight: 20
  },

  rowInput: {
    flex: 2
  },

  removeButton: {
    padding: 10
  },

  removeButtonText: {
    color: Colors.red,
    fontWeight: 'bold'
  },

  statusContainer: {
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingTop: 20
  },

  markStatus: {
    color: Colors.blue,
    fontWeight: '600'
  },

  help: {
    fontWeight: 'bold',
    color: Colors.purple,
    paddingTop: 10
  },

  centerText: {
    textAlign: 'center'
  }

});
