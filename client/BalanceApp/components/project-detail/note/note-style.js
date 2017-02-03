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
    flexDirection: 'row',
    justifyContent: 'space-between',
    opacity: 0.6,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  content: {
    color: "#525252",
    fontSize: 15,
    padding: 10
  },
  noteButton: {
    height: 20,
    marginRight: 5,
    width: 20
  },
  empty: {
    alignSelf: 'center'
  }
});