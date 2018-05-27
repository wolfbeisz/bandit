import React, { Component } from 'react';
import './App.css';
import ImageCarousel from './components/ImageCarousel';
import apple from './fruit/if_apple_753485.png';
import avocado from './fruit/if_avocado_753486.png';
import banana from './fruit/if_banana_753487.png';
import cherry from './fruit/if_cherry_753488.png';
import orange from './fruit/if_fruit_orange_1898850.png';
import pineapple from './fruit/if_fruit_pineapple_1898846.png';
import bandit from './bandit.png';

const images = [apple, avocado, banana, cherry, orange, pineapple];

class App extends Component {
  constructor() {
    super();
    this.state = this.getInitialConfig();

    this.haltCarousel = this.haltCarousel.bind(this);
    this.restart = this.restart.bind(this);
    this.stop = this.stop.bind(this);
    this.onChangeDirection = this.onChangeDirection.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getInitialConfig() {
    return {
      carousels: [
        {
          id: 0,
          images: shuffle(images.slice()),
          selectedIndex: 0,
          halted: false,
        },
        {
          id: 1,
          images: shuffle(images.slice()),
          selectedIndex: 0,
          halted: false,
        },
        {
          id: 2,
          images: shuffle(images.slice()),
          selectedIndex: 0,
          halted: false,
        }
      ],
      slideDirectionDown: true,
      status: ''
    };
  }

// todo: respect asynchronity of setState
  tick() {
    this.setState({
      carousels: this.state.carousels.map(config => {
        if (config.halted) {
          return config;
        }
        return {
          id: config.id,
          images: config.images,
          selectedIndex: this.calculateNextIndex(config.selectedIndex, config.images.length),
          halted: config.halted
        }
      })
    });
  }

  calculateNextIndex(curIndex, imageCount) {
    if (this.state.slideDirectionDown) {
      let index = curIndex - 1;
      if (index < 0) {
        index = index + imageCount;
      }
      return index;
    }
    return (curIndex + 1) % imageCount;
  }

  haltCarousel(carouselId) {
    this.setState({
      carousels: this.state.carousels.map(config => {
        if (config.id === carouselId) {
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

  stop() {
      const activeCarousels = this.state.carousels.filter(item => !item.halted);
      if (activeCarousels.length > 0) {
        this.haltCarousel(activeCarousels[0].id);
      }
      if (activeCarousels.length === 1) {
        // set result message: check whether the images match
        const matchingImages = !!this.state.carousels.map(item => item.images[item.selectedIndex]).reduce(function(a, b){ return (a === b) ? a : NaN; });
        if (matchingImages) {
          this.setState({
            status: 'you win!'
          });
        }
        else {
        this.setState({
          status: 'you loose!'
        });
      }
      }
  }

  onChangeDirection(event) {
    this.setState({
      onChangeDirection: !event.target.value
    })
  }

  render() {
    return (
      <div>
        <div className='carousel-container'>
          <ImageCarousel id={this.state.carousels[0].id} images={this.state.carousels[0].images} selectedIndex={this.state.carousels[0].selectedIndex} insertElementsBefore={1} size={3} onHalt={this.haltCarousel} />
          <ImageCarousel id={this.state.carousels[1].id} images={this.state.carousels[1].images} selectedIndex={this.state.carousels[1].selectedIndex} insertElementsBefore={1} size={3} onHalt={this.haltCarousel} />
          <ImageCarousel id={this.state.carousels[2].id} images={this.state.carousels[2].images} selectedIndex={this.state.carousels[2].selectedIndex} insertElementsBefore={1} size={3} onHalt={this.haltCarousel} />
          <div><img src={bandit} alt='onearmed bandit' onClick={this.stop} /></div>
        </div>
        <button onClick={this.stop} type='button'>stop</button>
        <button onClick={() => this.restart()} type='button'>restart</button>
        <input type='checkbox' onChange={this.onChangeDirection} checked={this.state.slideDirectionDown} value={this.state.slideDirectionDown} />
        <div><span>{this.state.status}</span></div>
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
