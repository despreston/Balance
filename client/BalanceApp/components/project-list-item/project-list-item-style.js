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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    paddingHorizontal: 5
  },
  title: {
    color: '#487CC3',
    fontSize: 18,
    fontWeight: 'bold'
  },
  notes: {
    height: 100,
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  noteType: {
    color: '#3D3F3E',
    fontWeight: 'bold'
  },
  noteContent: {
    color: '#77778A',
    height: 40,
    fontSize: 14
  },
  lastUpdated: {
    color: '#CFD0D4',
    fontSize: 12,
    paddingBottom: 8,
    paddingHorizontal: 5
  }
});