import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create ({

  projectDetail: {
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  title: {
    color: '#2E92E1',
    fontFamily: 'Helvetica Neue',
    fontSize: 20,
    fontWeight: 'bold',
    height: 70,
    textAlign: 'center',
    paddingHorizontal: 10
  },
  container: {
    flex: 1
  },
  updateButtonContainer: {
    flexDirection: 'row',
    marginBottom: 10
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  pastNotesView: {
    marginTop: 15,
    padding: 5
  },
  finishedTitleText: {
    color: '#3D3F3E',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15
  }
  
});