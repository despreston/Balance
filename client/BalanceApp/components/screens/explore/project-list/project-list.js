import React, { Component, PropTypes } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';

class ProjectList extends Component {

  static propTypes = {
    projects: PropTypes.array.isRequired,
    component: PropTypes.func.isRequired,
    onProjectSelect: PropTypes.func.isRequired,
    itemWidth: PropTypes.number.isRequired
  }

  constructor (props) {
    super(props);

    this.sliderWidth = Dimensions.get('window').width - 16;
    this.itemWidth = (85 * this.sliderWidth) / 100;
  }

  renderProjects () {
    return this.props.projects.map((project, index) => {
      return (
        <TouchableOpacity
          key={ index }
          onPress={ () => this.props.onProjectSelect(project._id) }
        >
          <this.props.component
            project={ project }
            itemWidth={ this.props.itemWidth }
          />
        </TouchableOpacity>
      );
    });
  }

  render () {
    return (
      <Carousel
        ref={ carousel => { this._carousel = carousel; } }
        sliderWidth={ this.sliderWidth }
        itemWidth={ this.itemWidth }
      >
        { this.renderProjects() }
      </Carousel>
    );
  }
}

export default ProjectList;
