import { StyleSheet } from 'react-native';
import Colors from '../colors';
import Dimensions from 'Dimensions';

const defaultText = {
  color: Colors.white,
  textAlign: 'center'
};

export default StyleSheet.create  ({

  content: {
    backgroundColor: Colors.purple
  },

  card: {
    paddingVertical: 50,
    paddingHorizontal: 15,
    height: Dimensions.get('window').height, 
    width: Dimensions.get('window').width
  },

  navButtonContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },

  unimportantButton: {
    borderWidth: 2,
    borderColor: Colors.white,
    backgroundColor: Colors.purple
  },

  green: {
    backgroundColor: Colors.green
  },

  text: {
    ...defaultText,
    paddingBottom: 20,
    fontSize: 20
  },

  subText: {
    ...defaultText,
    paddingBottom: 20,
    fontSize: 14
  }

});