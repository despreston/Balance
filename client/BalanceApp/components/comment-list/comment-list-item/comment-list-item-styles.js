import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create  ({

  transparent: {
    opacity: 0.2
  },

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

  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingVertical: 6
  },

  contentText: {
    color: Colors.gray.tundora,
    lineHeight: 20,
    fontSize: 14
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

  authorComment: {
    color: Colors.green
  },

  subtext: {
    color: Colors.gray.silver,
    fontSize: 12
  },

  bold: {
    fontWeight: 'bold'
  }

});
