import { StyleSheet } from 'react-native';
import Colors from '../../colors';

export default StyleSheet.create ({

  container: {
    backgroundColor: Colors.purple,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },

  icon: {
    width: 70,
    height: 70
  },

  title: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    fontSize: 42,
    color: Colors.white,
    letterSpacing: 1.7
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 25,
    marginTop: 5
  },

  text: {
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center'
  },

  bold: {
    fontStyle: 'normal',
    fontWeight: '700'
  },

  button: {
    marginTop: 60,
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: Colors.blue,
    paddingHorizontal: 5,
    width: 200,
    height: 50
  },

  buttonText: {
    fontSize: 18
  }

});
