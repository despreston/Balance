import { StyleSheet } from 'react-native';

export const Style = StyleSheet.create({
  projectListItem: {
    backgroundColor: '#F5F6FA',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#E8E8EA',
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0EF',
    flex: 1,
    justifyContent: 'center',
    height: 40
  },
  title: {
    color: '#487CC3',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 5,
    paddingRight: 5
  },
  notes: {
    height: 100,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingTop: 10,
    paddingRight: 5
  },
  noteType: {
    color: '#3D3F3E',
    fontWeight: 'bold'
  },
  noteContent: {
    color: '#77778A',
    marginBottom: 10
  },
  lastUpdated: {
    color: '#CFD0D4',
    fontSize: 12,
    paddingBottom: 8,
    paddingLeft: 5,
    paddingRight: 5
  }
});