import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create ({

  projectDetail: {
    backgroundColor: Colors.purple,
    flex: 1
  },

  main: {
    minHeight: Dimensions.get('window').height-110
  },

  container: {
    flex: 1
  },

  emptyText: {
    paddingTop: 15,
    alignSelf: 'center',
    color: Colors.gray.tundora
  },

  updateButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    height: 40
  },

  updateButton: {
    backgroundColor: Colors.blue,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    height: 40,
    marginHorizontal: 25
  },

  updateButtonText: {
    alignSelf: 'center',
    fontSize: 16
  },

  whiteText: {
    color: Colors.white
  },

  bold: {
    fontWeight: 'bold'
  },

  purpleBackground: {
    backgroundColor: Colors.purple
  },

  whiteBackground: {
    backgroundColor: Colors.white
  }
  
});