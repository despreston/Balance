import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create({

  notification: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray.porcelain,
    alignItems: 'center',
    marginHorizontal: 10,
    paddingVertical: 15
  },

  flexRow: {
    flexDirection: 'row'
  },

  avatar: {
    height: 34,
    width: 34,
    borderRadius: 17
  },

  link: {
    fontWeight: 'bold',
    color: Colors.purple
  },

  textContainer: {
    flex: 1,
    marginHorizontal: 15
  },

  text: {
    lineHeight: 20,
    color: Colors.gray.tundora
  },

  date: {
    fontSize: 12,
    color: Colors.gray.silver
  }

});