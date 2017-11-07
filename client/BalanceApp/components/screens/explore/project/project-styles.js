import { StyleSheet } from 'react-native';
import Colors from '../../../colors';

export default StyleSheet.create  ({

  popular: {
    borderRadius: 6,
    height: 120,
    marginTop: 10,
    backgroundColor: Colors.white,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: Colors.gray.tundora,
    shadowOffset: { width: 0.05, height: 0.05 },
    shadowOpacity: 0.2,
    shadowRadius: 6
  },

  text: {
    color: Colors.gray.tundora
  },

  title: {
    color: Colors.gray.tundora,
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
    marginRight: 5
  },

  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between'
  },

  categoryContainer: {
    alignItems: 'center'
  },

  category: {
    color: Colors.purple,
    fontSize: 12,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: Colors.purple,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2
  },

  empty: {
    color: Colors.gray.silver,
    textAlign: 'center'
  },

  row: {
    flexDirection: 'row'
  },

  bookmarkCount: {
    color: Colors.gray.silver,
    alignSelf: 'center',
    paddingLeft: 8,
    fontSize: 12
  }

});
