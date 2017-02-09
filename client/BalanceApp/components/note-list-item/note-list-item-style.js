import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create  ({
  editButton: {
    height: 20,
    width: 20
  },
  container: {
    flexDirection: 'column'
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  lastUpdated: {
    color: '#B8B8BA',
    fontSize: 13
  },
  content: {
    color: '#3D3F3E',
    fontSize: 15,
    paddingVertical: 5
  }
});