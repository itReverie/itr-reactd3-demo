import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { LineChart, Line , XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';


import { extent as d3Extent, max as d3Max } from 'd3-array';
import { scaleLinear as d3ScaleLinear, scaleTime as d3ScaleTime} from 'd3-scale';
import { format as d3Format } from 'd3-format';

const data=[
  {"name": "Anna", "uv":18000},
  {"name": "Luis", "uv":19000},
  {"name": "Sandra", "uv":20000},
  {"name": "James", "uv":21000},
  {"name": "John", "uv":22000}
];

const dataDemo=[
  {"date": new Date(2016,5,24).getTime(), "value":8000},
  {"date": new Date(2016,5,25).getTime(), "value":19000},
  {"date": new Date(2016,5,29).getTime(), "value":20000},
  {"date": new Date(2016,6,2).getTime(), "value":21000},
  {"date": new Date(2016,6,14).getTime(), "value":22000}
];

//There is an issue trying to display date time in the x axis
// const dateFormat = d => new Date(d);
const dateFormat = (time) => {
	return new Date (time);
};


const domain = d3Extent (dataDemo, d=>new Date(d.date));
const tScale = d3ScaleTime().domain(domain).range([0, 1]);
const tickFormat = tScale.tickFormat();

const kbDomain = [0, d=>d3Max([d.setsize,d.getsize])];
const kbScale = d3ScaleLinear().domain(kbDomain).range([0, 1]);
const kbTickFormat = kbScale.tickFormat(5,d3Format(".1f"));



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
          <XAxis dataKey="name"/>
          <YAxis />
          <Tooltip />
        </LineChart>

        <LineChart width={500} height={300} data={dataDemo}>
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" tickFormatter = {tickFormat}  tick={{stroke: 'red', strokeWidth: 2}}/>
          <YAxis
         tickFormatter = {kbTickFormat} />
         <Tooltip />
        </LineChart>


        </div>
    );
  }
}

export default App;
