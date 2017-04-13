import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export const Style = StyleSheet.create({

  projectListItem: {
    borderRadius: 4,
    height: 160,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    flexDirection: 'row'
  },

  title: {
    color: Colors.gray.tundora,
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 5
  },

  content: {
    flex: 1,
    paddingLeft: 15,
    paddingVertical: 10,
    justifyContent: 'space-between'
  },

  note: {
    lineHeight: 18,
    fontSize: 14,
    color: Colors.gray.tundora
  },

  text: {
    color: Colors.gray.silver,
    fontSize: 11
  },

  message: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.gray.tundora
  },

  footer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  },

  footerIcons: {
    flexDirection: 'row'
  }
  
});