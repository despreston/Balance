import React, { Component } from 'react';
import {
  Image,
  Animated,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import styles from './header-styles';
import UpdateButton from '../update-button/update-button';
import Nudges from '../../../nudges/nudges';
import CollapsiblePanel from '../../../collapsible-panel/collapsible-panel';

class Header extends Component {

  constructor (props) {
    super(props);

    this.state = {
      headerExpanded: false,
      toggleHeaderIcon: new Animated.Value()
    };
  }

  toggleHeader () {
    const initialValue = this.state.headerExpanded ? 180 : 0;
    const finalValue   = this.state.headerExpanded ? 0 : 180;

    this.state.toggleHeaderIcon.setValue(initialValue);

    Animated.spring(
      this.state.toggleHeaderIcon,
      { toValue: finalValue }
    ).start();

    this.setState({ headerExpanded: !this.state.headerExpanded });
  }

  render () {
    const {
      project,
      userIsOwner,
      goToAuthor,
      toggleAddUpdateModal
    } = this.props;

    const headerIconRotation = this.state.toggleHeaderIcon.interpolate({
      inputRange: [ 0, 360 ],
      outputRange: [ '0deg', '360deg' ]
    });

    return (
      <View style={ styles.header }>
        {
          project.status === 'finished' &&
          (
            <View>
              <Text style={[ styles.description, styles.bold ]}>
                This project has been finished!  🎉
              </Text>
            </View>
          )
        }
        <View style={ styles.top }>
          <Text style={[ styles.title, styles.bold ]}>
            { project.title }
          </Text>
          <TouchableOpacity
            onPress={ () => this.toggleHeader() }
          >
            <Animated.Image
              source={ require('../../../../assets/icons/chevron.png') }
              style={{
                height: 20,
                width: 20,
                transform: [{ rotate: headerIconRotation }]
              }}
            />
          </TouchableOpacity>
        </View>

        <CollapsiblePanel
          height={ 80 }
          expanded={ this.state.headerExpanded }
        >
          <View style={ styles.panel }>
            <Text style={[ styles.smallText, styles.bold ]}>
              Author:
              <Text onPress={ goToAuthor } style={ styles.author }>
                { ` ${project.owner[0].username}` }
              </Text>
            </Text>
            <Text style={[ styles.smallText ]}>
              <Text style={ styles.bold }>Category:</Text> { project.category }
            </Text>
          </View>
        </CollapsiblePanel>

        <View style={ styles.testButtons }>
          <View style={ styles.testButtonWrapper }>
            <Image
              style={ styles.testButtonImage }
              source={ require('../../../../assets/icons/star.png') }
            />
          </View>
          <View style={ styles.testButtonWrapper }>
            <Image
              style={ styles.testButtonImage }
              source={ require('../../../../assets/icons/nudge.png') }
            />
          </View>
        </View>

        {
          project.nudgeUsers && (
            <View style={ styles.nudges }>
              <Nudges
                nudgeUsers={ project.nudgeUsers }
                imageSize={ 30 }
              />
            </View>
          )
        }

        <View style={ styles.descriptionWrapper }>
          <Text style={[ styles.description ]}>
            { project.description }
          </Text>
        </View>
        <View style={ styles.header }>
          {
            userIsOwner && project.status !== 'finished' &&
            <UpdateButton press={ toggleAddUpdateModal } />
          }
        </View>
      </View>
    );
  }
}

export default Header;
