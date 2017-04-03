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
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 15,
    height: Dimensions.get('window').height, 
    width: Dimensions.get('window').width
  },

  navButtonContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },

  unimportantButton: {
    borderWidth: 1.5,
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