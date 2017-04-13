import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create  ({

  container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray.porcelain,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12
  },

  picture: {
    width: 34,
    height: 34,
    borderRadius: 17
  },

  right: {
    flex: 1,
    padding: 0,
    paddingLeft: 20
  },

  content: {
    color: Colors.gray.tundora,
    lineHeight: 20,
    fontSize: 14,
    paddingVertical: 6
  },

  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  commenter: {
    color: Colors.purple,
    fontSize: 14,
    fontWeight: 'bold'
  },

  subtext: {
    color: Colors.gray.silver,
    fontSize: 12
  },

  bold: {
    fontWeight: 'bold'
  }
  
});