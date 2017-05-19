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
        <Text style={ Styles.topic }>{ text }</Text>
      </TouchableOpacity>
    );
  }

  scroll (amount) {
    this.scrollView.scrollTo({ y: amount });
    this.setState({ showHideBtn: true });
  }

  goToTop () {
    this.scrollView.scrollTo({ y: 0 });
    this.setState({ showHideBtn: false }); 
  }

  render () {
    const { visible, hideFn } = this.props;

    return (
      <Modal animationType='slide' visible={ visible } >
        <ScrollView
          style={ Styles.content }
          ref={(scrollView) => { this.scrollView = scrollView; }}
        >
          <View style={ Styles.topics }>
            { this.topic('Purpose of this app', 1) }
            { this.topic('Nudges', 2) }
            { this.topic('Project colors', 3) }
            { this.topic('How can I find other users?', 4) }
            { this.topic('Who made this?', 5) }
          </View>

          <View style={ Styles.answer }>
            <Text style={ Styles.topic }>Purpose of this app</Text>
            <Text style={ Styles.text }>
              Balance was created for those that are juggling multiple activities, 
              hobbies, or projects. The idea is to get you back 
              into the flow of things no matter how long of a break you take.
            </Text>
            <Text style={ Styles.text }>
              Create a new project and add a new update any time you work on the
              project or want to add something to do later.
            </Text>
          </View>
          <View style={ Styles.answer }>
            <Text style={ Styles.topic }>Nudges</Text>
            <Text style={ Styles.text }>
              If you're eager for an update on a project, you can send the owner 
              of the project a nudge.
            </Text>
            <Text style={ Styles.text }>
              To nudge someone, look for the { }
              <Image source={ require('../../assets/icons/nudge-white.png') } style={{ width: 20, height: 20}}/>
              { } icon on the project page. The author of that project will receive
              a notification telling them you want them to update their project.
            </Text>
            <Text style={ Styles.text }>
              Nudges are reset when a new update is added to the project.
            </Text>
          </View>
          <View style={ Styles.answer }>
            <Text style={ Styles.topic }>Project colors</Text>
            <Text style={ Styles.text}>
              <Image source={ require('../../assets/project-status-color.png') } style={{ borderRadius: 4, width: 281, height: 155}}/>
            </Text>
            <Text style={ Styles.text }>
              The color on the right in the list of projects 
              corresponds to how long its been since the last update for that 
              project. Green: 2 days, Yellow: 8 days, Orange: 15 days, Red: Long time!
            </Text>
          </View>
          <View style={ Styles.answer }>
            <Text style={ Styles.topic }>
              How can I find other users?
            </Text>
            <Text style={ Styles.text }>
              You can search for any user by going to your Profile page and
              tapping the { }
              <Image source={ require('../../assets/icons/users.png') } style={{ width: 20, height: 20}}/>
              { } icon in the top left corner.
            </Text>
          </View>
          <View style={ Styles.answer }>
            <Text style={ Styles.topic }>Who made this?</Text>
            <ProfileInfo user={ this.me } customTextStyle={[ Styles.me ]}/>
            <Text style={[ Styles.text, { paddingTop: 20 } ]}>
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