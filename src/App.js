import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { LineChart, Line , XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

const data=[
  {"name": "Anna", "uv":18000},
  {"name": "Luis", "uv":19000},
  {"name": "Sandra", "uv":20000},
  {"name": "James", "uv":21000},
  {"name": "John", "uv":22000}
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React and Recharts</h1>
        </header>

        <LineChart width={500} height={300} data={data}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>

        </div>
    );
  }
}

export default App;
