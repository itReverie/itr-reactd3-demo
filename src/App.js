import React, { Component } from 'react';
import logo from './logo.svg';
import BarGraph from './components/BarGraph';
import AreaClosedGraph from './components/AreaClosedGraph';
import Axis from './reusables/Axis';
import './App.css';

const dataDemo=[
  {"date": "Sat Jan 01 2000 00:00:00 GMT-0800 (PST)", "value":"18000"},
  {"date": "Sat Jan 02 2000 00:00:00 GMT-0800 (PST)", "value":"19000"},
  {"date": "Sat Jan 03 2000 00:00:00 GMT-0800 (PST)", "value":"20000"},
  {"date": "Sat Jan 04 2000 00:00:00 GMT-0800 (PST)", "value":"21000"},
  {"date": "Sat Jan 05 2000 00:00:00 GMT-0800 (PST)", "value":"22000"}
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React and VX</h1>
        </header>


        <BarGraph width={500} height={500} color={'#ffabcb'} />
        <AreaClosedGraph width={800} height={500} margin={{left:70, top:20, right:70, bottom:75}} data={dataDemo} />
        <Axis width={800} height={500} margin={{left:70, top:20, right:70, bottom:75}} data={dataDemo} />
      </div>
    );
  }
}

export default App;
