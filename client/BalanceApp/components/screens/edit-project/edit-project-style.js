import { StyleSheet } from 'react-native';

export default StyleSheet.create  ({

  editProject: {
    backgroundColor: '#E9E9EF',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  formContainer: {
    backgroundColor: '#F5F6FA',
    flex: 1
  },

  inputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8EA'
  },

  rowLabel: {
    color: '#3D3F3E',
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 10,
    flex: 1
  },

  rowInput: {
    color: '#77778A',
    fontSize: 16,
    paddingLeft: 10,
    flex: 2
  },

  removeButton: {
    padding: 10
  },

  removeButtonText: {
    color: '#B86D6F'
  }

});