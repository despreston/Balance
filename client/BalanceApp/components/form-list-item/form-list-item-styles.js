import { StyleSheet } from 'react-native';
import Colors from '../colors';

export default StyleSheet.create ({

  listItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray.porcelain
  },

  rowLabel: {
    paddingLeft: 10,
    fontWeight: 'bold',
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
  }

});