import { StyleSheet } from 'react-native';
import Colors from '../../colors';

const shared = {
  color: Colors.gray.tundora
};

export default StyleSheet.create  ({

  ProfileInfo: {
    alignSelf: 'center',
    minHeight: 100
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
    marginBottom: 20,
    justifyContent: 'center'
  },

  username: {
    ...shared,
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center'
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
    fontSize: 14,
    textAlign: 'center',
    paddingBottom: 5
  },

  selectedContext: {
    ...shared,
    fontWeight: 'bold'
  },

  purpleText: {
    color: Colors.purple,
    fontWeight: '600'
  },

  border: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.purple
  }

});