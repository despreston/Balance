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
    color: '#B8B8BA',
    fontSize: 13
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  content: {
    color: '#3D3F3E',
    fontSize: 15,
    marginTop: 15
  }
});