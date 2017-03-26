import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create({

  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  touchable: {
    height: 30,
    width: 30,
    justifyContent: 'center'
  },
  
  image: {
    height: 20,
    width: 20
  },

  text: {
    color: Colors.white,
    paddingHorizontal: 10,
    fontStyle: 'italic'
  }
  
});