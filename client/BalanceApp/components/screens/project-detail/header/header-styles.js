import { StyleSheet } from 'react-native';
import Colors from '../../../colors';

export default StyleSheet.create ({

  header: {
    paddingTop: 5,
    backgroundColor: Colors.purple,
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  title: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '500',
    paddingHorizontal: 10,
    letterSpacing: 0.8,
    paddingBottom: 10
  },

  smallText: {
    fontSize: 12,
    textAlign: 'center'
  },

  categoryContainer: {
    flex: 1,
    alignItems: 'center'
  },

  category: {
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 10,
    paddingVertical: 3,
    marginVertical: 5,
    width: 100
  },

  whiteText: {
    color: Colors.white
  },

  description: {
    paddingVertical: 15,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20
  },

  bold: {
    fontWeight: 'bold'
  },

  circles: {
    flexDirection: 'row',
    paddingVertical: 15,
    width: 25,
    justifyContent: 'space-between'
  },

  circle: {
    borderColor: Colors.white,
    height: 8,
    width: 8,
    borderRadius: 4,
    borderWidth: 1
  },

  whiteBackground: {
    backgroundColor: Colors.white
  }

});
