import { StyleSheet } from 'react-native';

export const Style = StyleSheet.create  ({
  container: {
    padding: 5
  },
  title: {
    color: '#3D3F3E',
    fontSize: 16,
    fontWeight: 'bold'
  },
  date: {
    color: '#77778A',
    fontSize: 14
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  content: {
    color: '#333',
    fontSize: 14,
    marginTop: 15
  }
});