import React, {Component} from 'react';
import CarouselImage from './CarouselImage';

class ImageCarousel extends Component {
  render() {
    const images = this.props.images.map(image => (
      <li key={image} className='carousel-element'>
        <CarouselImage imageUrl={image} />
      </li>
    )
  );
    return (
      <div>
        <ul className="carousel">
          {images}
        </ul>
      </div>
    );
  }
}

export default ImageCarousel;
