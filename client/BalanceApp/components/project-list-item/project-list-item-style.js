import { StyleSheet } from 'react-native';

export const Style = StyleSheet.create({

  projectListItem: {
    backgroundColor: '#F5F6FA',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E8E8EA',
    shadowColor: '#000000',
    shadowOffset: { width: 0.5, height: 0.5 },
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
    paddingHorizontal: 10
  },

  title: {
    color: '#2E92E1',
    fontSize: 18,
    fontWeight: 'bold'
  },

  notes: {
    height: 100,
    paddingVertical: 10,
    paddingHorizontal: 10
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
    paddingHorizontal: 10
  },

  empty: {
    alignSelf: 'center',
    justifyContent: 'center'
  }
  
});