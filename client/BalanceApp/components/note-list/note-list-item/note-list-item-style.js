import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export const Styles = StyleSheet.create  ({

  container: {
    flexDirection: 'column'
  },

  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  createdAt: {
    color: Colors.gray.silver,
    fontSize: 12
  },

  content: {
    color: Colors.gray.tundora,
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: 15
  },

  bottom: {
    flexDirection: 'row'
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
  }
  
});