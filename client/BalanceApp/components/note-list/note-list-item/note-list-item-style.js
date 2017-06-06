import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export const Styles = StyleSheet.create  ({

  container: {
    backgroundColor: Colors.white,
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.gray.porcelain
  },

  flexRow: {
    flexDirection: 'row'
  },

  top: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray.porcelain,
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
    paddingTop: 0,
    padding: 10,
    color: Colors.gray.tundora,
    fontSize: 14,
    lineHeight: 20
  },

  body: {
    paddingTop: 15
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
    backgroundColor: Colors.gray.porcelain,
    height: 100,
    marginBottom: 10
  },

  avatar: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    marginRight: 5
  },

  bottom: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderTopWidth: 1,
    borderTopColor: Colors.gray.porcelain
  }
  
});