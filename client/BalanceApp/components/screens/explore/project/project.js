import React, { PropTypes, Component } from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';
import Styles from './project-styles';
import StatusIcon from '../../../status-icon/StatusIcon';
import Nudges from '../../../nudges/nudges';

class Project extends Component {

  static propTypes = {
    project: PropTypes.shape({
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      lastUpdated: PropTypes.instanceOf(Date),
      bookmark_count: PropTypes.number
    }).isRequired,
    itemWidth: PropTypes.number.isRequired
  }

  renderDescription () {
    const { description } = this.props.project;
    const emptyMsg = 'No project description.';
    const styles = [ Styles.text, !description && Styles.empty ];

    return <Text style={ styles }>{ description || emptyMsg }</Text>;
  }

  renderNudgeUsers () {
    const { nudgeUsers } = this.props.project;

    if (nudgeUsers && nudgeUsers.length > 0) {
      return <Nudges nudgeUsers={ nudgeUsers } />
    }

    return null;
  }

  renderBookmarkCount () {
    const { bookmark_count } = this.props.project;

    if (bookmark_count) {
      return (
        <View style={ Styles.row }>
          <Image
            source={ require('../../../../assets/icons/star-filled.png') }
            style={{ height: 20, width: 20 }}
          />
          <Text style={ Styles.bookmarkCount }>
            { `${bookmark_count}x` }
          </Text>
        </View>
      );
    }
  }

  render () {
    return (
      <View style={[ Styles.popular, { width: this.props.itemWidth } ]}>
        <View style={ Styles.content }>
          <View style={ Styles.row }>
            <View style={{ flex: 1 }}>
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
            { this.renderNudgeUsers() }
            { this.renderBookmarkCount() }
          </View>
        </View>
        <StatusIcon
          lastUpdated={ new Date(this.props.project.lastUpdated) }
        />
      </View>
    )
  }

}

export default Project;
