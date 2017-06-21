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

  title: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '300',
    paddingHorizontal: 10,
    letterSpacing: 0.8,
    paddingBottom: 10,
  },

  smallText: {
    fontSize: 12,
    opacity: 0.9,
    textAlign: 'center'
  },

  category: {
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginVertical: 10
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

  infoTextContainer: {
    flex: 1,
    justifyContent: 'center'
  },

  description: {
    textAlign: 'center',
    lineHeight: 19,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  info: {
    minHeight: 130,
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  bold: {
    fontWeight: 'bold'
  },

  purpleBackground: {
    backgroundColor: Colors.purple
  },

  whiteBackground: {
    backgroundColor: Colors.white,
  }
  
});