import { StyleSheet } from 'react-native';

export default StyleSheet.create  ({

  userListItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8EA',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 15
  },

  picture: {
    width: 40,
    height: 40,
    borderRadius: 20
  },

  right: {
    flex: 1,
    padding: 5,
    paddingLeft: 20
  },

  text: {
    color: '#3D3F3E',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 5
  },

  displayName: {
    color: '#2E92E1',
    fontSize: 12
  },

  lighter: {
    color: '#B8B8BA',
  }
  
});