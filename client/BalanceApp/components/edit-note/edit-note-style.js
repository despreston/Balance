import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create  ({
  editNote: {
    marginTop: 30
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  actions: {
    flexDirection: 'row',
  },
  headerText: {
    color: '#525252',
    fontSize: 18,
    fontWeight: 'bold'
  },
  spacer: {
    backgroundColor: '#CFD0D4',
    width: 2,
    height: 25,
    marginHorizontal: 10
  },
  clear: {
    color: '#C65D63'
  }
});