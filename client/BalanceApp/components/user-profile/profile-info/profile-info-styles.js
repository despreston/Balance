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
    alignItems: 'center',
    flexDirection: 'row'
  },

  image: {
    borderRadius: 40,
    height: 80,
    width: 80
  },

  statsRow: {
    marginLeft: 30
  },

  statsText: {
    fontWeight: 'bold',
    color: Colors.purple,
    paddingLeft: 5
  },

  info: {
    marginLeft: 25,
    height: 80,
    marginBottom: 15,
    justifyContent: 'center'
  },

  mainName: {
    ...shared,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },

  secondaryName: {
    ...shared,
    fontSize: 18,
    fontWeight: 'normal',
    textAlign: 'center',
    paddingTop: 5
  },

  bio: {
    ...shared,
    paddingVertical: 10,
    paddingHorizontal: 30,
    textAlign: 'center'
  },

  friendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
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
