import React, { Component } from 'react';
import logo from './assets/logo.png';
import Grid from '@material-ui/core/Grid';
import './App.css';
import SliderPage from './compnents/sliderpage';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  }

  render() {

    return (
      <section className="main">
        <header className="content">
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <div className="head">
                <img src={logo} className="logo" alt="logo" />
              </div>
              <SliderPage />
            </Grid>
          </Grid>
        </header>
      </section>
    )
  }
}


export default App;
