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

  smallLightText: {
    color: Colors.gray.silver,
    fontSize: 12
  },

  content: {
    color: Colors.gray.tundora,
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: 15
  },

  comment: {
    paddingRight: 10,
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

  bottom: {
    justifyContent: 'space-between'
  },

  doneBtn: {
    justifyContent: 'center'
  },

  dontBtnText: {
    color: Colors.purple,
    fontSize: 12,
    fontWeight: 'bold'
  }
  
});