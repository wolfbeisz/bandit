import React, {Component} from 'react';

class CarouselImage extends Component {
  render() {
    return (
      <img src={this.props.imageUrl} alt='' />
    );
  }
}

export default CarouselImage;
