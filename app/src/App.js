import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Bacterium from './Bacterium';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Bacterias Artificiais</h2>
        </div>
        <Bacterium />
      </div>
    );
  }
}

export default App;
