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
    height: 22,
    width: 22
  },

  text: {
    color: Colors.white,
    fontSize: 10,
    paddingHorizontal: 10,
    fontStyle: 'italic'
  }
  
});