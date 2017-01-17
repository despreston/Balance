import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create  ({
  note: {
    flex: 1
  },
  header: {
    backgroundColor: "#F9F9F9",
    borderTopColor: "#F6F6F6",
    borderStyle: "solid",
    borderTopWidth: 2, 
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  headerTitle: {
    color: "#525252",
    fontSize: 16,
    fontWeight: 'bold'
  },
  content: {
    color: "#525252",
    fontSize: 14,
    padding: 10
  }
});