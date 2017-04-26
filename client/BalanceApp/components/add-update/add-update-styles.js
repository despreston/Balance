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

  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },

  top: {
    paddingHorizontal: 15,
    justifyContent: 'space-between'
  },

  card: {
    paddingTop: 35,
    height: Dimensions.get('window').height, 
    width: Dimensions.get('window').width
  },

  navButtonContainer: {
    paddingHorizontal: 10,
    paddingBottom: 15,
    alignSelf: 'center'
  },

  unimportantButton: {
    borderWidth: 1.5,
    borderColor: Colors.white,
    backgroundColor: Colors.purple
  },

  green: {
    backgroundColor: Colors.green
  },

  subText: {
    ...defaultText,
    fontSize: 14
  }

});