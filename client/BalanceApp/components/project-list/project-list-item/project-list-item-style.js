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
    paddingRight: 10,
    paddingVertical: 10
  },

  note: {
    fontStyle: 'italic',
    fontSize: 14,
    color: Colors.gray.tundora,
    paddingVertical: 25
  },

  text: {
    color: Colors.gray.silver,
    fontSize: 12
  },

  message: {
    textAlign: 'center',
    paddingTop: 15,
    fontSize: 14,
    color: Colors.gray.tundora
  },

  footer: {
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  }
  
});