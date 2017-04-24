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
    marginBottom: 100,
    fontSize: 42,
    color: Colors.white,
    letterSpacing: 1.7
  },

  subtitle: {
    fontSize: 18,
    marginBottom: 30
  },

  bold: {
    fontStyle: 'normal',
    fontWeight: 'bold'
  },

  button: {
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: Colors.blue,
    width: 200,
    height: 50
  },

  white: {
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center'
  }
  
});