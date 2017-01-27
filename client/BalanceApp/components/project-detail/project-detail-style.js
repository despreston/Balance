import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create  ({
  projectDetail: {
    flex: 1
  },
  title: {
    color: '#2E92E1',
    fontFamily: 'Helvetica Neue',
    fontSize: 22,
    height: 70,
    textAlign: 'center',
    paddingHorizontal: 10
  },
  container: {
    flex: 1
  },
  updateButtonContainer: {
    flexDirection: 'row',
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
  notesContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 20
  },
  note: {
    flex: 1
  },
  header: {
    backgroundColor: '#F9F9F9',
    borderTopColor: '#F6F6F6',
    borderStyle: 'solid',
    borderTopWidth: 2, 
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  headerTitle: {
    color: '#525252',
    fontSize: 16,
    fontWeight: 'bold'
  },
  content: {
    color: '#525252',
    fontSize: 14,
    padding: 10
  }
});