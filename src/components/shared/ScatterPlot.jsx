import React, { Component } from 'react';

import { scaleLinear, extent } from 'd3';

class ScatterPlot extends Component {

  constructor(props) {
    super(props);

    this.xScale = scaleLinear();
    this.yScale = scaleLinear();

    this.updateD3(props);
  }

  updateD3(props) {
    this.xScale.domain(extent(props.data, d => d.x))
               .range([0, props.width]);

    this.yScale.domain(extent(props.data, d => d.y))
               .range([0, props.height])
  }

  render() {
    const circles = this.props.data.map(({x,y}, index) => (
      <circle key={index} cx={this.xScale(x)} cy={this.yScale(y)} r={2} />
    ));

    const transform = `translate(${this.props.x}, ${this.props.y})`
    return (
      <g transform={transform}>{circles}</g>
    );
  }

}

export default ScatterPlot;
