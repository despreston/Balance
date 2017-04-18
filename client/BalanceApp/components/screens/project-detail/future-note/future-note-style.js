import { StyleSheet } from 'react-native';

export const Style = StyleSheet.create  ({

  container: {
    padding: 10
  },

  title: {
    color: '#3D3F3E',
    fontSize: 16,
    fontWeight: 'bold'
  },

  date: {
    color: '#B8B8BA',
    fontSize: 12
  },

  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  content: {
    color: '#3D3F3E',
    lineHeight: 18,
    fontSize: 14,
    marginTop: 15
  },

  center: {
    alignSelf: 'center'
  }

});