import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create  ({

  ProfileInfo: {
    alignSelf: 'center',
    flexDirection: 'row'
  },

  image: {
    borderRadius: 25,
    height: 60,
    width: 60  
  },

  info: {
    marginLeft: 25,
    justifyContent: 'center'
  },

  name: {
    fontSize: 18
  },

  displayName: {
    fontSize: 18,
    fontWeight: 'bold'
  }

});