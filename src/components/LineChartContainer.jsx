import React, { Component } from 'react';

import LineChart from './shared/LineChart';

var data = [
	{day: '02-11-2016', count: 180},
	{day: '02-12-2016', count: 250},
	{day: '02-13-2016', count: 150},
	{day: '02-14-2016', count: 496},
	{day: '02-15-2016', count: 140},
	{day: '02-16-2016', count: 380},
	{day: '02-17-2016', count: 100},
	{day: '02-18-2016', count: 150},
	{day: '02-19-2016', count: 180},
	{day: '02-20-2016', count: 105},
	{day: '02-21-2016', count: 100},
	{day: '02-22-2016', count: 496},
	{day: '02-23-2016', count: 140},
	{day: '02-24-2016', count: 32}
];

var margin = {
	top: 5,
	right: 50,
	bottom: 50,
	left: 50
};

var width = 1200;
var height = 400;

class LineChartContainer extends Component {

  render() {
    return (
      <div className="LineChartContainer">
        <LineChart
          data={data}
          margin={margin}
          width={width}
          height={height}
          title="Visitors"
        />
      </div>
    );
  }

}

export default LineChartContainer;
