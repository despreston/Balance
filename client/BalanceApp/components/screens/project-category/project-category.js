import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity } from 'react-native';
import FormListItem from '../../form-list-item/form-list-item';
import styles from './project-category-styles';

class ProjectCategory extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.categories = [
      'Arts and Crafts',
      'Education',
      'Household',
      'Technology',
      'Other'
    ];
  }

  render () {
    return (
      <View style={ styles.container }>
        {
          this.categories.map((category, i) => {
            return (
              <TouchableOpacity
                key={ i }
                onPress={ () => this.props.onPress(category) }
              >
                <FormListItem
                  touchable
                  style={{ borderBottomWidth: 0 }}
                  label={ category }
                />
              </TouchableOpacity>
            );
          })
        }
      </View>
    );
  }

}

export default ProjectCategory;