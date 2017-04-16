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
    paddingHorizontal: 20
  },

  meta: {
    paddingVertical: 30,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    paddingBottom: 20
  },

  flexRow: {
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
    paddingTop: 5,
    paddingBottom: 25
  },

  date: {
    color: Colors.gray.silver,
    fontSize: 12
  },

  text: {
    ...defaults.text,
    lineHeight: 20
  },

  comments: {
    marginTop: 20
  }

});