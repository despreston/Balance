import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create  ({

  editProject: {
    backgroundColor: Colors.gray.porcelain,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  formContainer: {
    backgroundColor: Colors.white,
    flex: 1
  },

  inputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray.porcelain
  },

  rowLabel: {
    fontWeight: 'bold',
    flex: 1
  },

  text: {
    color: Colors.gray.tundora,
    paddingLeft: 10,
    fontSize: 15
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
    paddingHorizontal: 5
  },

  markStatus: {
    color: Colors.blue,
    fontWeight: 'bold'
  },

  help: {
    fontWeight: 'bold',
    color: Colors.purple
  }

});