import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export const Styles = StyleSheet.create  ({

  container: {
    flexDirection: 'column'
  },

  flexRow: {
    flexDirection: 'row'
  },

  top: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  topLeft: {
    alignItems: 'center'
  },

  smallLightText: {
    color: Colors.gray.silver,
    fontSize: 12
  },

  content: {
    color: Colors.gray.tundora,
    fontSize: 14,
    lineHeight: 20,
    paddingBottom: 10
  },

  body: {
    paddingTop: 10
  },

  comment: {
    paddingRight: 5,
    justifyContent: 'center'
  },

  dark: {
    color: Colors.gray.tundora,
    fontWeight: '400'
  },

  darker: {
    color: Colors.gray.tundora,
    fontWeight: '600' 
  },

  blue: {
    color: Colors.blue,
    fontWeight: '600'
  },

  picture: {
    height: 100,
    marginBottom: 10
  },

  avatar: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    marginRight: 5
  }
  
});