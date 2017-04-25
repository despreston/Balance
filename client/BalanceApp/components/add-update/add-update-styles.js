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

  card: {
    paddingTop: 35,
    paddingBottom: 20,
    paddingHorizontal: 15,
    height: Dimensions.get('window').height, 
    width: Dimensions.get('window').width
  },

  navButtonContainer: {
    paddingVertical: 15,
    alignSelf: 'center',
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
    marginRight: 10,
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600'
  },

  subText: {
    ...defaultText,
    fontSize: 14
  }

});