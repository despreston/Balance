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
    flex: 1,
    paddingVertical: 20
  },

  inputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10
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
    color: '#B86D6F',
    fontWeight: 'bold',
    fontSize: 18
  }

});