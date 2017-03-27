import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export const Styles = StyleSheet.create ({

  projectDetail: {
    backgroundColor: '#FFFFFF',
    flex: 1
  },

  title: {
    fontSize: 26,
    fontWeight: '300',
    paddingHorizontal: 10,
    letterSpacing: 0.8,
    paddingBottom: 10,
  },

  author: {
    fontSize: 12,
    paddingBottom: 30,
    opacity: 0.9
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
    paddingTop: 25,
    paddingHorizontal: 20
  },

  updateButton: {
    backgroundColor: Colors.blue,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    height: 40,
    marginHorizontal: 5
  },

  updateButtonText: {
    alignSelf: 'center',
    fontSize: 16
  },

  pastNotesView: {
    marginTop: 15
  },

  finishedTitleText: {
    color: '#3D3F3E',
    fontSize: 15,
    padding: 5,
    paddingTop: 10
  },

  whiteText: {
    color: Colors.white
  },

  finishedProjectText: {
    color: Colors.gray.tundora,
    fontSize: 16,
    flex: 1,
    marginBottom: 15,
    textAlign: 'center'
  },

  info: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 25,
    backgroundColor: Colors.purple,
  },

  bold: {
    fontWeight: 'bold'
  },

  nudgeStuff: {
    alignItems: 'center'
  }
  
});