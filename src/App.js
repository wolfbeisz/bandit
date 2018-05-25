import React, { Component } from 'react';
import './App.css';
import ImageCarousel from './components/ImageCarousel';
import apple from './fruit/if_apple_753485.png';
import avocado from './fruit/if_avocado_753486.png';
import banana from './fruit/if_banana_753487.png';
import cherry from './fruit/if_cherry_753488.png';
import orange from './fruit/if_fruit_orange_1898850.png';

class App extends Component {
  render() {
    const images = [apple, avocado, banana, cherry, orange];
    return (
      <ImageCarousel images={images} />
    );
  }
}

export default App;
