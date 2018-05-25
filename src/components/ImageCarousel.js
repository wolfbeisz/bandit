import React, {Component} from 'react';
import CarouselImage from './CarouselImage';

class ImageCarousel extends Component {
  renderImages() {
    const originalImages = this.props.images;
    const copy = originalImages.slice();
    const doubled = originalImages.concat(copy);
    const result = [];
    for (let index = this.props.selectedIndex; index < originalImages.length + this.props.selectedIndex; index++) {
      result.push(doubled[index]);
    }

    const images = result.map(image =>
      (
        <li key={image} className='carousel-element'>
        <CarouselImage imageUrl={image} />
        </li>
      )
    );
    return images;
  }

  render() {
    const images = this.renderImages();
    return (
      <div className='carousel'>
      <ul className='carousel-list'>
      {images}
      </ul>
      <button
      onClick={() => this.props.onHalt(this.props.id)}
      >
      stop
      </button>
      </div>
    );
  }
}

export default ImageCarousel;
