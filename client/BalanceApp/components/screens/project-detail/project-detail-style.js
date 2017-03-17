import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create ({

  projectDetail: {
    backgroundColor: '#FFFFFF',
    flex: 1
  },

  title: {
    color: '#3D3F3E',
    fontSize: 26,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 30
  },

  container: {
    flex: 1
  },

  emptyText: {
    alignSelf: 'center',
    color: '#3D3F3E'
  },

  updateButtonContainer: {
    flexDirection: 'row',
    paddingBottom: 25
  },

  updateButton: {
    backgroundColor: '#2E92E1',
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    height: 40,
    marginHorizontal: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1
  },

  updateButtonText: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 16
  },

  pastNotesView: {
    marginTop: 15
  },

  finishedTitleText: {
    color: '#3D3F3E',
    fontSize: 15,
    marginBottom: 15,
    padding: 5
  },

  finishedProjectText: {
    color: '#3D3F3E',
    fontSize: 16,
    flex: 1,
    marginBottom: 15,
    textAlign: 'center'
  },

  nudgedText: {
    color: '#3D3F3E',
    textAlign: 'center',
    fontSize: 13,
    paddingBottom: 20
  },

  bold: {
    fontWeight: 'bold'
  }
  
});