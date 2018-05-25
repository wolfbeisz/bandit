import React, { Component } from 'react';
import './App.css';
import ImageCarousel from './components/ImageCarousel';
import apple from './fruit/if_apple_753485.png';
import avocado from './fruit/if_avocado_753486.png';
import banana from './fruit/if_banana_753487.png';
import cherry from './fruit/if_cherry_753488.png';
import orange from './fruit/if_fruit_orange_1898850.png';

const images = [apple, avocado, banana, cherry, orange];

class App extends Component {
  constructor() {
    super();
    this.state = this.getInitialConfig();
    setInterval(() => this.tick(), 100);

    this.haltCarousel = this.haltCarousel.bind(this);
    this.restart = this.restart.bind(this);
  }

  getInitialConfig() {
    return {
      carousels: [
        {
          id: 0,
          images: shuffle(images.slice()),
          selectedIndex: 0,
          halted: false,
          //todo: add size, maybe even buffer
        },
        {
          id: 1,
          images: shuffle(images.slice()),
          selectedIndex: 0,
          halted: false,
          //todo: add size, maybe even buffer
        },
        {
          id: 2,
          images: shuffle(images.slice()),
          selectedIndex: 0,
          halted: false,
          //todo: add size, maybe even buffer
        }
      ]
    };
  }

  tick() {
    this.setState({
      carousels: this.state.carousels.map(config => {
        if (config.halted) {
          return config;
        }
        return {
          id: config.id,
          images: config.images,
          selectedIndex: (config.selectedIndex + 1) % config.images.length,
          halted: config.halted
        }
      })
    });
  }

  haltCarousel(carouselId) {
    this.setState({
      carousels: this.state.carousels.map(config => {
        if (config.id == carouselId) {
          return {
            id: config.id,
            images: config.images,
            selectedIndex: config.selectedIndex,
            halted: true
          }
        }
        return config;
      })
    });
  }

  restart() {
    this.setState(this.getInitialConfig());
  }

  render() {
    return (
      <div>
      <div className='carousel-container'>
        <ImageCarousel id={this.state.carousels[0].id} images={this.state.carousels[0].images} selectedIndex={this.state.carousels[0].selectedIndex} onHalt={this.haltCarousel} />
        <ImageCarousel id={this.state.carousels[1].id} images={this.state.carousels[1].images} selectedIndex={this.state.carousels[1].selectedIndex} onHalt={this.haltCarousel} />
        <ImageCarousel id={this.state.carousels[2].id} images={this.state.carousels[2].images} selectedIndex={this.state.carousels[2].selectedIndex} onHalt={this.haltCarousel} />
      </div>
      <button onClick={() => this.restart()}>restart</button>
      </div>
    );
  }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default App;
