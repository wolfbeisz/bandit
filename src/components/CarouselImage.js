import React, {Component} from 'react';

class CarouselImage extends Component {
  render() {
    let className = 'carousel-element';
    if (this.props.selected) {
      className = className  + ' selected'
    }
    return (
      <li className={className}>
        <img src={this.props.imageUrl} alt='' />
      </li>
    );
  }
}

export default CarouselImage;
