import { StyleSheet } from 'react-native';

export default StyleSheet.create  ({

  ProfileInfo: {
    alignSelf: 'center'
  },

  row: {
    justifyContent: 'center',
    flexDirection: 'row'
  },

  image: {
    borderRadius: 30,
    height: 60,
    width: 60  
  },

  info: {
    marginLeft: 25,
    width: 170
  },

  username: {
    color: '#3D3F3E',
    flex: 1,
    fontSize: 16,
    textAlign: 'center'
  },

  name: {
    fontWeight: 'bold',
    color: '#3D3F3E',
    flex: 1,
    fontSize: 18,
    textAlign: 'center'
  },

  contextOption: {
    marginTop: 25,
    flex: 1,
    justifyContent: 'space-between'
  },

  contextOptionText: {
    color: '#77778A',
    fontSize: 14,
    textAlign: 'center'
  },

  selectedContext: {
    color: '#3D3F3E',
    fontWeight: 'bold'
  }

});