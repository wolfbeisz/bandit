import React, {Component} from 'react';
import CarouselImage from './CarouselImage';

class ImageCarousel extends Component {
  renderImages() {
    const originalImages = this.props.images;
    const copy = originalImages.slice();
    const doubled = originalImages.concat(copy);
    let result = [];
    if (this.props.selectedIndex - this.props.insertElementsBefore >= 0){
      //result = doubled.slice(this.props.selectedIndex - this.props.insertElementsBefore, originalImages.length + this.props.selectedIndex - this.props.insertElementsBefore);
      result = doubled.slice(this.props.selectedIndex - this.props.insertElementsBefore, this.props.selectedIndex - this.props.insertElementsBefore + this.props.size);
    }
    else {
      // replace selectedIndex with lastIndexOf it
      //result = doubled.slice(this.props.selectedIndex + originalImages.length - this.props.insertElementsBefore, 2 * originalImages.length + this.props.selectedIndex - this.props.insertElementsBefore);
      result = doubled.slice(this.props.selectedIndex + originalImages.length - this.props.insertElementsBefore, this.props.selectedIndex + originalImages.length - this.props.insertElementsBefore + this.props.size);
    }


    const images = result.map((image, index) =>
      (
          <CarouselImage key={image} imageUrl={image} selected={index === this.props.insertElementsBefore}/>
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
          type='button'
        >
          stop
        </button>
      </div>
    );
  }
}

export default ImageCarousel;
