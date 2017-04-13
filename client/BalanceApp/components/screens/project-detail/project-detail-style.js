import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export const Styles = StyleSheet.create ({

  projectDetail: {
    backgroundColor: Colors.white,
    flex: 1
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
    paddingBottom: 20,
    opacity: 0.9,
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
    marginVertical: 20,
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
    textAlign: 'center'
  },

  infoTextContainer: {
    flex: 1,
    justifyContent: 'center'
  },

  description: {
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 20,
  },

  info: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.purple,
    justifyContent: 'space-between'
  },

  bold: {
    fontWeight: '600'
  }
  
});