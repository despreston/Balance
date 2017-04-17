import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../colors';

export const Styles = StyleSheet.create ({

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

  author: {
    fontSize: 12,
    opacity: 0.9,
    paddingBottom: 20,
    textAlign: 'center'
  },

  container: {
    flex: 1,
    paddingTop: 10
  },

  emptyText: {
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

  pastNotesView: {
    marginTop: 15
  },

  finishedTitleText: {
    color: Colors.gray.tundora,
    fontSize: 15,
    padding: 10
  },

  whiteText: {
    color: Colors.white
  },

  finishedProjectText: {
    color: Colors.gray.tundora,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center'
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
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  bold: {
    fontWeight: '600'
  },

  purpleBackground: {
    backgroundColor: Colors.purple
  },

  whiteBackground: {
    backgroundColor: Colors.white,
  }
  
});