import React, { Component } from 'react';
import '../App.css';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

class SliderPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usdData: [],
      gbpData: [],
      eurData: [],
      CurrentRate: 'Price',
      RateDis: 'Current Rate'
    };
  }

  componentDidMount() {
    this.getPrice();
  };

  getPrice = async () => {
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    const json = await response.json();
    this.setState({ usdData: json.bpi.USD });
    this.setState({ gbpData: json.bpi.GBP });
    this.setState({ eurData: json.bpi.EUR });
  };

  _counter = (e) => {
    const index = e.slideIndex;

    if (index === 0) {
      this.setState({ CurrentRate: 'Price' });
      this.setState({ RateDis: 'Current Rate' });
    }
    if (index === 1) {
      this.setState({ CurrentRate: this.state.usdData.rate });
      this.setState({ RateDis: this.state.usdData.description });
    }
    if (index === 2) {
      this.setState({ CurrentRate: this.state.gbpData.rate });
      this.setState({ RateDis: this.state.gbpData.description });
    }
    if (index === 3) {
      this.setState({ CurrentRate: this.state.eurData.rate });
      this.setState({ RateDis: this.state.eurData.description });
    }

    console.log(index);
  };

  render() {

    const { CurrentRate, RateDis } = this.state;
    const slides = [
      { title: 'Swipe' },
      { title: 'USA' },
      { title: 'GBP' },
      { title: 'EUR' }
    ];

    return (
      <div>
        <div className="priceBox">
          <h2 className="RateText">{CurrentRate}</h2>
          <p className="RateDis">{RateDis}</p>
        </div>
        <div className="slideBox">
          <Slider onSlideChange={(e) => this._counter(e)}>
            {slides.map((slide, index) => {
              return (
                <div key={index}>
                  <div className="itemBox">
                    <h4>{slide.title}</h4>
                  </div>
                </div>)
            })}
          </Slider>
        </div>
      </div>

    )
  }
}


export default SliderPage;
