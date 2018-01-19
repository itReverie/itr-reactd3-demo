import React, { Component } from 'react';
import logo from './logo.svg';
import BarGraph from './components/BarGraph';
import AreaClosedGraph from './components/AreaClosedGraph';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <BarGraph width={500} height={500} color={'#ffabcb'} />
        <AreaClosedGraph width={800} height={500} margin={{left:70, top:20, right:70, bottom:75}} />

      </div>
    );
  }
}

export default App;
