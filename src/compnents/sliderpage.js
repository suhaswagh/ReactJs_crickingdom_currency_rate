import React, { Component } from 'react';
import '../App.css';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

// Comments have added for Code Explanation 

class SliderPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Data: [],                                      // API DATA  
      CurrentRate: 'Current Rate',                   // Initial Value of CurrentRate 
      RateDis: 'Swipe below to see current rate',    // Initial Value of RateDis
      currencyData: [],                              // Object Keys as Array
      currentCurrency: 0,                            // Current Currency Slide
    };
  }

  componentDidMount() {
    this.getPrice();                                 // Function Mount
  };

  getPrice = async (e) => {                          // Function to fetch API & Store Values
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');  // fetch API with Link
    const json = await response.json();              // Converted Data to Json
    this.setState({ Data: json.bpi });               // Store Json Data to Data State
    const { Data } = this.state;                     // this.State Declaration
    this.setState({ currencyData: ["Swipe up/down", ...Object.keys(Data)] }); // Craeted & Stored Object Keys as a Array with Custome Value to currencyData State
  };

  _counter = (e) => {                                // onSlideChange Function
    const CurrencyName = e.slideIndex;               // Value of current slider index in CurrencyName
    this.setState({
      currentCurrency: CurrencyName                  // Set current slider index to currentCurrency State
    });

    const { Data, currencyData, currentCurrency } = this.state;  // this.State Declaration

    const currentSlide = currencyData[this.state.currentCurrency];  // current Slide Array Item in currentSlide

    if (currentCurrency === 0) {                     // Statement for initial array item
      this.setState({ CurrentRate: 'Current Rate' })  // Set initial Value
      this.setState({ RateDis: 'Swipe below to see current rate' })  // Set initial Value
    };
    if (currentCurrency > 0) {                       // Statement for next all array items
      this.setState({ CurrentRate: Data[`${currentSlide}`].rate })  // Set CurrentRate Value for current Currency
      this.setState({ RateDis: Data[`${currentSlide}`].description })  // Set RateDis (discription) Value for current Currency
    };
  };

  render() {                                         // Reder Method

    const { CurrentRate, RateDis, currencyData} = this.state;  // this.State Declaration
    return (
      <div>
        <div className="priceBox">                      
          <h2 className="RateText">{CurrentRate}</h2>   
          <p className="RateDis">{RateDis}</p>          
        </div>
        <div className="slideBox">
          <Slider onSlideChange={(e) => this._counter(e)}>   
            {currencyData.map((slide, index) => {
              return (
                <div key={index}>
                  <div className="itemBox">
                    <h4>{slide}</h4>                   
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
