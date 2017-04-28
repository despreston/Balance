import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Styles from '../project-detail-style';

export default function UpdateButton ({ press }) {
  return (
    <View style={ Styles.updateButtonContainer }>
      <TouchableOpacity
        onPress={ press }
        style={ Styles.updateButton }>
        <Text
          style={ [Styles.updateButtonText, Styles.bold, Styles.whiteText] }>
          Add an update
        </Text>
      </TouchableOpacity>
    </View>
  );
}