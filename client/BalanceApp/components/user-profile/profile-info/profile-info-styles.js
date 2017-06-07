import { StyleSheet } from 'react-native';
import Colors from '../../colors';

const shared = {
  color: Colors.gray.tundora
};

export default StyleSheet.create  ({

  ProfileInfo: {
    alignSelf: 'center'
  },

  row: {
    justifyContent: 'center',
    flexDirection: 'row'
  },

  image: {
    borderRadius: 30,
    height: 60,
    width: 60
  },

  info: {
    marginLeft: 25,
    height: 60,
    marginBottom: 15,
    justifyContent: 'center'
  },

  username: {
    ...shared,
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center',
    paddingTop: 5
  },

  name: {
    ...shared,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },

  bio: {
    ...shared,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 30,
    textAlign: 'center'
  },

  friendButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  contextOption: {
    marginTop: 25,
    flex: 1,
    paddingHorizontal: 5,
    justifyContent: 'space-between'
  },

  contextOptionText: {
    ...shared,
    fontSize: 12,
    color: Colors.gray.silver,
    textAlign: 'center',
    paddingBottom: 5
  },

  contextOptionCount: {
    fontWeight: 'bold',
    fontSize: 18
  },

  bold: {
    fontWeight: 'bold'
  },

  selectedContext: {
    color: Colors.purple
  },

  border: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.purple
  }

});