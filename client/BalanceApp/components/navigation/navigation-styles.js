import { StyleSheet } from 'react-native';
import Colors from '../colors';

export const styles = StyleSheet.create  ({

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
    height: 20,
    width: 20
  }

});