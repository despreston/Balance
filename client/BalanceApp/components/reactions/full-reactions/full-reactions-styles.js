import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create  ({

  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },

  center: {
    justifyContent: 'center'
  },

  flex: {
    flex: 1
  },

  overlay: {
    backgroundColor: 'grey',
    opacity: 0.5
  },

  userlist: {
    backgroundColor: Colors.white,
    height: 400,
    marginHorizontal: 10,
    borderRadius: 5,
    padding: 10
  },

  listItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray.porcelain
  },

  bold: {
    fontWeight: '600'
  },

  text: {
    color: Colors.gray.tundora
  },

  close: {
    position: 'absolute',
    bottom: 20,
    width: 100,
    height: 30,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue
  },

  closeText: {
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center'
  },

  reaction: {
    fontSize: 20
  }

});
  