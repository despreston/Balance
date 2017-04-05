import { StyleSheet } from 'react-native';
import Colors from '../../colors';

const defaults = {

  text: {
    color: Colors.gray.tundora
  }

};

export default StyleSheet.create ({

  container: {
    flex: 1,
    backgroundColor: Colors.white
  },

  scrollContainer: {
    padding: 30
  },

  meta: {
    flexDirection: 'row',
    paddingBottom: 20
  },

  header: {
    ...defaults.text,
    fontSize: 20,
    fontWeight: '600'
  },

  subheader: {
    ...defaults.text,
    paddingTop: 5
  },

  authorImage: {
    height: 60,
    width: 60,
    borderRadius: 30
  },

  info: {
    paddingHorizontal: 20
  },

  purple: {
    color: Colors.purple,
    fontWeight: 'bold'
  },

  note: {
    paddingBottom: 20
  },

  date: {
    color: Colors.gray.silver,
    fontSize: 12
  },

  text: {
    ...defaults.text,
    lineHeight: 20
  }

});