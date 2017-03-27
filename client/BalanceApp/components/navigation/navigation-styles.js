import { StyleSheet } from 'react-native';
import Colors from '../colors';

export const styles = StyleSheet.create  ({

  mainTitle: {
    letterSpacing: 5,
    fontWeight: 'bold'
  },

  button: {
    paddingHorizontal: 20
  },

  text: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600'
  },

  touchable: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },

  icon: {
    height: 25,
    width: 25
  }

});