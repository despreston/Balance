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
    borderRadius: 25,
    height: 60,
    width: 60  
  },

  info: {
    marginLeft: 25,
    width: 170
  },

  displayName: {
    color: '#3D3F3E',
    justifyContent: 'center',
    flex: 1,
    fontWeight: 'bold',
    fontSize: 18
  },

  name: {
    color: '#3D3F3E',
    flex: 1,
    fontSize: 18
  },

  stats: {
    marginTop: 15,
    marginRight: 10,
    color: '#3D3F3E'
  }

});