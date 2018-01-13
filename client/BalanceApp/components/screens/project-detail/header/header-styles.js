import { StyleSheet } from 'react-native';
import Colors from '../../../colors';

export default StyleSheet.create ({

  testButtons: {
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center'
  },

  testButtonImage: {
    height: 25,
    width: 25
  },

  testButtonWrapper: {
    opacity: 0.8,
    height: 40,
    marginHorizontal: 10,
    width: 40,
    borderWidth: 1,
    borderColor: Colors.gray.silver,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },

  testButton: {
    color: Colors.blue,
    fontWeight: '700',
    fontSize: 12
  },

  header: {
    paddingTop: 5,
    paddingHorizontal: 20
  },

  top: {
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  title: {
    color: Colors.purple,
    fontSize: 30
  },

  smallText: {
    color: Colors.purple,
    fontSize: 14,
    lineHeight: 25
  },

  author: {
    color: Colors.blue
  },

  descriptionWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray.porcelain,
    borderTopWidth: 1,
    borderTopColor: Colors.gray.porcelain
  },

  description: {
    color: Colors.gray.tundora,
    paddingVertical: 25,
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 20
  },

  bold: {
    fontWeight: '800'
  },

  nudges: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15
  },

  panel: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    borderColor: Colors.gray.porcelain
  }

});
