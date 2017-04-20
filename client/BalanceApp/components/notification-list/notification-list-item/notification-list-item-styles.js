import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create({

  notification: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray.porcelain,
    alignItems: 'center',
    marginHorizontal: 5,
    paddingHorizontal: 5,
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

  textContainer: {
    paddingHorizontal: 10
  },

  link: {
    fontWeight: 'bold',
    color: Colors.purple
  },

  text: {
    color: Colors.gray.tundora
  }

});