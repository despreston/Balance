import { StyleSheet } from 'react-native';
import Colors from '../colors';

export default StyleSheet.create ({

  listItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray.porcelain,
    marginHorizontal: 10
  },

  rowLabel: {
    fontWeight: '800',
    flex: 1
  },

  text: {
    color: Colors.gray.tundora,
    fontSize: 15
  },

  touchableRowIcon: {
    width: 17,
    height: 17,
    position: 'absolute',
    right: 10
  },

  error: {
    color: Colors.red
  }

});
