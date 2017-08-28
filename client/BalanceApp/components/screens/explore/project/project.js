import React, { PropTypes, Component } from 'react';
import { View, Text } from 'react-native';
import Styles from './project-styles';

class Project extends Component {

  static propTypes = {
    project: PropTypes.shape({
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      lastUpdated: PropTypes.instanceOf(Date).isRequired
    }).isRequired,
    itemWidth: PropTypes.number.isRequired
  }

  renderDescription () {
    const { description } = this.props.project;
    const emptyMsg = 'No project description.';
    const styles = [ Styles.text, !description && Styles.empty ];

    return <Text style={ styles }>{ description || emptyMsg }</Text>;
  }

  render () {
    return (
      <View style={[ Styles.popular, { width: this.props.itemWidth } ]}>
        <View style={ Styles.content }>
          <View style={ Styles.top }>
            <View style={{flex: 1}}>
              <Text numberOfLines={ 2 } style={[ Styles.text, Styles.title ]}>
                { this.props.project.title }
              </Text>
            </View>
            <View style={ Styles.categoryContainer }>
              <Text style={ Styles.category }>
                { this.props.project.category }
              </Text>
            </View>
          </View>
          { this.renderDescription() }
          <View>
          </View>
        </View>
      </View>
    )
  }

}

export default Project;
