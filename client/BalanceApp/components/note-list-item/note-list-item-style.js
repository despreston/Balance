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
    color: '#77778A',
    fontSize: 14
  },
  content: {
    color: '#333',
    fontSize: 14,
    paddingVertical: 5
  }
});