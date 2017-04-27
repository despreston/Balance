import { StyleSheet } from 'react-native';
import Colors from '../colors';

export default StyleSheet.create ({

  profile: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: 50
  },

  profileInfo: {
    marginBottom: 20
  },

  body: {
    flex: 1
  },

  userSearch: {
    fontWeight: 'bold',
    color: '#3D3F3E',
    textAlign: 'center',
    paddingVertical: 5
  },

  emptyText: {
    paddingTop: 50,
    color: Colors.gray.tundora,
    fontSize: 15,
    textAlign: 'center'
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  findFriends: {
    marginTop: 15,
    height: 40,
    width: 160,
    borderRadius: 5,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center'
  },

  findFriendsText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16
  }

});