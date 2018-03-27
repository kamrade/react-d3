import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  axisLeft as d3AxisLeft,
  axisBottom as d3AxisBottom,
  timeDay as d3TimeDay,
  timeFormat as d3TimeFormat
} from 'd3';

import Axis from './Axis';
import Grid from './Grid';

class AxisAndGrid extends Component {

  render() {

    const { x, y, data, w, h } = this.props;

    let yAxis = d3AxisLeft(y)
      .ticks(5);

    let xAxis = d3AxisBottom(x)
      .ticks(d3TimeDay.every(5))
      .tickFormat(d3TimeFormat('%b %e'));

    let yGrid = d3AxisLeft(y)
      .ticks(5)
      .tickSize(-w,0,0)
      .tickFormat('');

    return (
      <g className="axis-and-grid">
        <Axis
          axis={xAxis}
          h={h}
          axisType='x'
        />
        <Axis
          axis={yAxis}
          h={h}
          axisType='y'
        />
        <Grid
          grid={yGrid}
          h={h}
          gridType='y'
        />
      </g>
    );
  }

}

AxisAndGrid.propTypes = {
  data: PropTypes.array,
  x: PropTypes.func,
  y: PropTypes.func,
  h: PropTypes.number,
  w: PropTypes.number
}

export default AxisAndGrid;
