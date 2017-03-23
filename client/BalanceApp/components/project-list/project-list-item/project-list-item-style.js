import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export const Style = StyleSheet.create({

  projectListItem: {
    borderRadius: 4,
    height: 140,
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
    paddingHorizontal: 10,
    paddingVertical: 10
  },

  note: {
    fontStyle: 'italic',
    fontSize: 14,
    color: Colors.gray.tundora,
    paddingVertical: 20
  },

  text: {
    color: Colors.gray.silver,
    fontSize: 12
  },

  finished: {
    textAlign: 'center',
    paddingTop: 15,
    fontSize: 14,
    color: Colors.gray.tundora
  }
  
});