import React, { Component, PropTypes } from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import Dimensions from 'Dimensions';
import Styles from './help-styles';
import ProfileInfo from '../user-profile/profile-info/profile-info';

export default class Help extends Component {

  static propTypes = {
    hideFn: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired
  }

  constructor (props) {
    super(props);

    this.state = { showHideBtn: false };

    this.scrollView = null;

    this.me = {
      userId: 'twitter|15740537',
      picture: 'https://pbs.twimg.com/profile_images/579124755392962560/G_z-2pJz_normal.jpg',
      name: 'Des Preston',
      username: 'des'
    };
  }

  /**
   * @param {String} text Content for answer
   * @param {number} index The index of the answer in the list of answers
   */
  topic (text, index) {
    return (
      <TouchableOpacity onPress={ () => this.scroll(index * Dimensions.get('window').height) }>
        <Text style={Styles.topic}>{ text }</Text>
      </TouchableOpacity>
    );
  }

  scroll (amount) {
    this.scrollView.scrollTo({ y: amount });
    this.setState({ showHideBtn: true });
  }

  goToTop () {
    this.scrollView.scrollTo({ y: 0});
    this.setState({ showHideBtn: false }); 
  }

  render () {
    const { visible, hideFn } = this.props;

    return (
      <Modal animationType={ 'slide' } visible={ visible } >
        <ScrollView
          style={ Styles.content }
          ref={(scrollView) => { this.scrollView = scrollView; }} >
          <View style={ Styles.topics }>
            { this.topic('Purpose of this app', 1) }
            { this.topic('Nudges', 2) }
            { this.topic('Project colors', 3) }
            { this.topic('Who made this?', 4) }
          </View>

          <View style={ Styles.answer }>
            <Text style={ Styles.topic }>Purpose of this app</Text>
            <Text style={ Styles.text }>
              Balance keeps track of what you worked on last, and what you need 
              to work on next time. It was created for those that are juggling 
              multiple activities, hobbies, projects, etc in their life. The 
              idea is to get you back into the flow of things no matter how long 
              of a break you take.
            </Text>
            <Text style={ Styles.text }>
              To use, answer 2 questions every time you are finished working: 
              What did you do this time? and What do you want to work on next 
              time? Next time you return to that activity, you'll know exactly 
              where you left off.
            </Text>
          </View>
          <View style={ Styles.answer }>
            <Text style={ Styles.topic }>Nudges</Text>
            <Text style={ Styles.text }>
              If you're eager for an update on a project, you can send the owner 
              of the project a nudge.
            </Text>
            <Text style={ Styles.text }>
              To nudge someone, look for the
               " <Image source={ require('../../assets/icons/nudge-white.png') } style={{ width: 20, height: 20}}/> " 
              icon on the project page. The author of that project will receive 
              a notification telling them you want them to update their project.
            </Text>
            <Text style={ Styles.text }>
              Nudges are reset when a new update is added to the project.
            </Text>
          </View>
          <View style={ Styles.answer }>
            <Text style={ Styles.topic }>Project colors</Text>
            <Text style={ Styles.text}>
              <Image source={ require('../../assets/project-status-color.png') } style={{ borderRadius: 4, width: 321, height: 127}}/>
            </Text>
            <Text style={ Styles.text }>
              The color bar on the right-hand-side in a list of projects 
              corresponds to how long its been since the last update for that 
              project.
            </Text>
          </View>
          <View style={ Styles.answer }>
            <Text style={ Styles.topic }>Who made this?</Text>
            <ProfileInfo user={ this.me } customTextStyle={[ Styles.me ]}/>
            <Text style={ Styles.text }>
              Hi, my name's Des Preston. I created Balance to manage my own 
              projects in 2016. Since then I've worked some long hours so I can
              see what my friends are also working on.
            </Text>
            <Text style={ Styles.text }>
              Feel free to get in touch with me on Twitter
              <Text style={ Styles.twitterHandle }> @despreston</Text>
            </Text>
          </View>
        </ScrollView>

        { 
          this.state.showHideBtn &&
          <TouchableOpacity onPress={ () => this.goToTop() } >
            <Image
              style={ Styles.top }
              source={ require('../../assets/icons/top.png')}
            />
          </TouchableOpacity>
        }

        <TouchableOpacity onPress={ () => hideFn() } style={ Styles.close }>
          <Text style={ Styles.closeText }>Close</Text>
        </TouchableOpacity>
      </Modal>
    );
  }

}