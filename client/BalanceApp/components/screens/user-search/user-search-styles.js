import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create ({

  container: {
    backgroundColor: '#fff',
    flex: 1
  },

  searchContainer: {
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#77778A'
  },

  searchBox: {
    height: 40  
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    paddingTop: 50,
    color: Colors.gray.tundora,
    fontSize: 16
  }
  
});