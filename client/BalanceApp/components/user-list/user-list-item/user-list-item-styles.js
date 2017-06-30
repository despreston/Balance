import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create  ({

  userListItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8EA',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 15
  },

  picture: {
    width: 40,
    height: 40,
    borderRadius: 20
  },

  right: {
    flex: 1,
    padding: 5,
    paddingLeft: 20
  },

  text: {
    color: Colors.gray.tundora,
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 2
  },

  small: {
    color: Colors.gray.silver,
    fontSize: 12
  }

});
