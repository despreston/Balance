import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create  ({

  editButton: {
    height: 20,
    width: 20,
    opacity: 0.4
  },

  editButtonContainer: {
    height: 20,
    borderWidth: 1,
    position: 'absolute',
    right: 10
  },

  container: {
    flexDirection: 'column'
  },

  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  createdAt: {
    color: '#B8B8BA',
    fontSize: 12
  },

  content: {
    color: '#3D3F3E',
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: 10
  },

  dark: {
    color: '#3D3F3E',
    fontWeight: '400'
  },

  darker: {
    color: '#3D3F3E',
    fontWeight: '600' 
  }
  
});