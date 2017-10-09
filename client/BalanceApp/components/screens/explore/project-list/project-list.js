import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Project from '../project/project';

class ProjectList extends Component {

  static propTypes = {
    projects: PropTypes.array.isRequired,
    onProjectSelect: PropTypes.func.isRequired,
    itemWidth: PropTypes.number.isRequired
  }

  constructor (props) {
    super(props);

    this.sliderWidth = Dimensions.get('window').width - 16;
    this.itemWidth = (85 * this.sliderWidth) / 100;
    this.renderProject = this.renderProject.bind(this);
  }

  renderProject ({ item, index }) {
    return (
      <TouchableOpacity
        key={ index }
        onPress={ () => this.props.onProjectSelect(item._id) }
      >
        <Project
          project={ item }
          itemWidth={ this.props.itemWidth }
        />
      </TouchableOpacity>
    );
  }

  render () {
    return (
      <Carousel
        data={ this.props.projects }
        renderItem={ this.renderProject }
        ref={ carousel => { this._carousel = carousel; } }
        sliderWidth={ this.sliderWidth }
        itemWidth={ this.itemWidth }
      />
    );
  }
}

export default ProjectList;
