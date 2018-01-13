import { StyleSheet } from 'react-native';
import Colors from '../../colors';

const shared = {
  color: Colors.gray.tundora
};

export default StyleSheet.create  ({

  profileInfo: {
    marginTop: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.gray.porcelain
  },

  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },

  icons: {
    flexDirection: 'row',
    marginTop: 10,
    height: 70
  },

  image: {
    alignSelf: 'center',
    borderRadius: 60,
    height: 120,
    width: 120,
    marginHorizontal: 8
  },

  icon: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },

  iconText: {
    fontWeight: 'bold',
    color: Colors.purple,
    paddingLeft: 10
  },

  iconImage: {
    height: 20,
    width: 20
  },

  info: {
    marginVertical: 16,
    justifyContent: 'center'
  },

  mainName: {
    ...shared,
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center'
  },

  secondaryName: {
    ...shared,
    fontSize: 18,
    fontWeight: 'normal',
    textAlign: 'center',
    color: Colors.gray.silver,
    paddingTop: 5
  },

  bio: {
    ...shared,
    paddingVertical: 10,
    paddingHorizontal: 30,
    textAlign: 'center'
  },

  friendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },

  contextOption: {
    marginTop: 25,
    flex: 1,
    paddingHorizontal: 5,
    justifyContent: 'space-between'
  },

  contextOptionText: {
    ...shared,
    fontSize: 12,
    color: Colors.gray.silver,
    textAlign: 'center',
    paddingBottom: 5
  },

  contextOptionCount: {
    fontWeight: 'bold',
    fontSize: 18
  },

  bold: {
    fontWeight: 'bold'
  },

  selectedContext: {
    color: Colors.purple
  },

  border: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.purple
  }

});
