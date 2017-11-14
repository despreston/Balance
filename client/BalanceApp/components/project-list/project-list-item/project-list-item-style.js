import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export const Style = StyleSheet.create({

  projectListItem: {
    shadowColor: Colors.gray.tundora,
    shadowOffset: { width: 0.05, height: 0.05 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    borderRadius: 6,
    height: 170,
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between'
  },

  note: {
    paddingTop: 8,
    lineHeight: 18,
    fontSize: 14,
    color: Colors.gray.tundora
  },

  text: {
    color: Colors.gray.silver,
    fontSize: 11
  },

  addNoteMessage: {
    paddingTop: 5
  },

  bold: {
    color: Colors.purple,
    fontWeight: 'bold',
    opacity: 1.0
  },

  message: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.gray.tundora,
    opacity: 0.8
  },

  borderTop: {
    borderTopWidth: 1,
    borderTopColor: Colors.gray.porcelain
  },

  footer: {
    paddingTop: 5,
    marginLeft: 5,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  },

  footerIcons: {
    flexDirection: 'row'
  }

});
