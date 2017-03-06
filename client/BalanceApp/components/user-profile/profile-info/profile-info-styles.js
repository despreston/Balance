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
    flex: 1,
    fontSize: 18,
    textAlign: 'center'
  },

  name: {
    fontWeight: 'bold',
    color: '#3D3F3E',
    flex: 1,
    fontSize: 18,
    textAlign: 'center'
  },

  stats: {
    marginTop: 25,
    flex: 1,
    textAlign: 'center',
    justifyContent: 'space-between',
    color: '#3D3F3E',
    fontSize: 14
  }

});