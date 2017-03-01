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
    flex: 1,
    justifyContent: 'center'
  },

  displayName: {
    lineHeight: 2,
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16
  },

  name: {
    lineHeight: 0,
    flex: 1,
    fontSize: 16
  }

});