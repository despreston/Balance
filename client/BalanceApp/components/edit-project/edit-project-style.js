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
  },

  rowLabel: {
    color: '#3D3F3E',
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 10
  },

  rowInput: {
    color: '#77778A',
    fontSize: 18,
    paddingLeft: 10,
    flex: 3
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