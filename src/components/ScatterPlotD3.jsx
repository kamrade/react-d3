import React, { Component } from 'react';
import { randomUniform, range } from 'd3';
import ScatterPlot from './shared/ScatterPlot';

class ScatterPlotD3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this._makeData()
    }
  }

  _makeData() {
    const random = randomUniform(1, 5);
    return range(500).map(_ => ({
      x: random(),
      y: random()
    }));
  }

  render() {
    return (
      <div className="ScatterPlotD3">
        <svg width="100%" height="500">
          <ScatterPlot
            data={this.state.data}
            x={100}
            y={10}
            width={500}
            height={300}
          />
        </svg>
      </div>
    );
  }

}

export default ScatterPlotD3;
