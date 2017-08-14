import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import styles from './bookmarks-styles';

class Bookmarks extends Component {

  static propTypes = {
    count: PropTypes.number,
    onPress: PropTypes.func.isRequired,
    textStyle: PropTypes.number
  }

  render () {
    const { count, onPress } = this.props;
    const text = (count > 1 || count === 0) ? 'Bookmarks' : 'Bookmark';

    return (
      <View style={ styles.center }>
        <TouchableOpacity
          onPress={ onPress }
          style={[ styles.center, styles.container ]}
        >
          <Image
            source={require('../../assets/icons/star-filled.png')}
            style={{ width: 15, height: 15 }}
          />
          <Text style={[ styles.text, this.props.textStyle ]}>
            {` ${count} ${text}`}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

}

export default Bookmarks;
