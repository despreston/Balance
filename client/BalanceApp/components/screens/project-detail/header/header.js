import React, { Component } from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import styles from './header-styles';
import UpdateButton from '../update-button/update-button';
import Carousel from 'react-native-snap-carousel';

class Header extends Component {

  constructor (props) {
    super(props);
    this.state = { slideIndex: 0 };
    this.width = Dimensions.get('window').width;
    this.circles = this.circles.bind(this);
  }

  privacyLevelText () {
    switch (this.props.project.privacyLevel) {
      case 'global': return 'Anyone can view this project.';
      case 'friends': return 'Only friends can view this project.';
      case 'private': return 'Only you can view this project.';
    }
  }

  circles () {
    return [0,0].map((circle, i) => {
      const style = [
        styles.circle,
        (i === this.state.slideIndex ? styles.whiteBackground : null)
      ];

      return <View key={ i } style={ style } />
    });
  }
  
  render () {
    const { project, userIsOwner, goToAuthor, toggleAddUpdateModal } = this.props;

    return (
      <View style={ styles.header}>
        <Carousel
          inactiveSlideScale={ 1 }
          inactiveSlideOpacity={ 1 }
          slideStyle={[ styles.header, { width: this.width, height: 130 } ]}
          sliderWidth={ this.width }
          itemWidth={ this.width }
          onSnapToItem={ slideIndex => this.setState({ slideIndex }) }
        >
          <View>
            <View>
              {
                project.status === 'finished' &&
                (
                  <View>
                    <Text style={[ styles.description, styles.bold, styles.whiteText ]}>
                      This project has been finished!  🎉
                    </Text>
                  </View>
                )
              }
              <Text style={ [styles.title, styles.whiteText] }>
                { project.title }
              </Text>
              <Text style={ [styles.smallText, styles.whiteText] }>
                Started by
                <Text
                  onPress={ goToAuthor }
                  style={[ styles.bold, { flex: 1 } ]}
                >
                  { ` ${project.owner[0].username}` }
                </Text>
              </Text>
            </View>
            <View style={ styles.infoTextContainer }>
              <Text
                style={[ styles.whiteText, styles.description ]}
                numberOfLines={ 2 }
              >
                { project.description }
              </Text>
            </View>
          </View>
          <ScrollView contentContainerStyle={ styles.infoTextContainer }>
            <Text style={[ styles.smallText, styles.whiteText ]}>
              { this.privacyLevelText() }
            </Text>
            <View style={ styles.categoryContainer }>
              <Text style={[ styles.smallText, styles.whiteText, styles.category ]}>
                { project.category }
              </Text>
            </View>
            <View>
              <Text
                style={[ styles.whiteText, styles.description ]}
              >
                { project.description }
              </Text>
            </View>
          </ScrollView>
        </Carousel>
        <View style={ styles.header }>
          <View style={ styles.circles }>
            { this.circles() }
          </View>
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