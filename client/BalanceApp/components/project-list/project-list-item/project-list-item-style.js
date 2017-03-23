import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export const Style = StyleSheet.create({

  projectListItem: {
    borderRadius: 4,
    height: 130,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    flexDirection: 'row'
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40
  },

  title: {
    color: Colors.gray.tundora,
    fontSize: 18,
    fontWeight: 'bold'
  },

  content: {
    flex: 1,
    paddingBottom: 8,
    paddingHorizontal: 10
  },

  note: {
    fontStyle: 'italic',
    fontSize: 14,
    color: Colors.gray.tundora,
    paddingTop: 15
  },

  text: {
    color: Colors.gray.silver,
    fontSize: 12,
    paddingBottom: 8
  },

  finished: {
    textAlign: 'center',
    paddingTop: 15,
    fontSize: 14,
    color: Colors.gray.tundora
  }
  
});