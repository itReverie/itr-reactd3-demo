import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BarChart, Legend,Bar, LineChart, Line , XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';


import { extent as d3Extent, max as d3Max } from 'd3-array';
import { scaleLinear as d3ScaleLinear, scaleTime as d3ScaleTime} from 'd3-scale';
import { format as d3Format } from 'd3-format';
import {timeFormat} from 'd3';

import CustomTooltip from './CustomDateToolTip'

const data=[
  {"name": "Anna", "debt":18000},
  {"name": "Luis", "debt":19000},
  {"name": "Sandra", "debt":20000},
  {"name": "James", "debt":21000},
  {"name": "John", "debt":22000}
];

const dataDemo=[
  {"date": new Date(2013,5,24).getTime(), "overdue":8000.54},
  {"date": new Date(2014,5,25).getTime(), "overdue":19000.75},
  {"date": new Date(2015,5,29).getTime(), "overdue":20000.99},
  {"date": new Date(2016,6,2).getTime(), "overdue":21000.50},
  {"date": new Date(2017,6,14).getTime(), "overdue":22000.34}
];


const domain = d3Extent (dataDemo, d=>new Date(d.date));
const tScale = d3ScaleTime().domain(domain).range([0, 1]);
const tickFormat = tScale.tickFormat(5,timeFormat('%m-%d-%Y'));

const kbDomain = [0, d=>d3Max([d.setsize,d.getsize])];
const kbScale = d3ScaleLinear().domain(kbDomain).range([0, 1]);
const kbTickFormat = kbScale.tickFormat(6,d3Format(".2f"));

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React and Recharts</h1>
        </header>
        <br/>
        <BarChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="debt" fill="#8884d8" />
      </BarChart>
<br/>
        <LineChart width={600} height={300} data={dataDemo}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <Line type="monotone" dataKey="overdue" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter = {tickFormat}  tick={{stroke: 'blue', strokeWidth: 0.1}}/>
          <YAxis tickFormatter = {kbTickFormat} />
         <Tooltip content={<CustomTooltip/>}/>
        </LineChart>

        </div>
    );
  }
}

export default App;
