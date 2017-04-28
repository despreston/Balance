// vendors
import React, { PropTypes } from 'react';
import {
  Text,
  ActionSheetIOS
} from 'react-native';

function PrivacyPicker ({ onChange, initLevel, textStyle }) {

  const levels = [
    { label: 'Everyone', val: 'global' },
    { label: 'Friends', val: 'friends' },
    { label: 'Just me', val: 'private' },
    { label: 'Cancel', val: initLevel }
  ];

  const labels = levels.map(level => level.label);

  function showActionSheet () {
    ActionSheetIOS.showActionSheetWithOptions({
      options: labels,
      cancelButtonIndex: 3
    }, buttonIndex => onChange(levels[buttonIndex].val ));
  }

  return (
      <Text style={textStyle} onPress={showActionSheet}>
        { levels.find(level => level.val === initLevel).label }
      </Text>
  );

}

PrivacyPicker.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default PrivacyPicker;