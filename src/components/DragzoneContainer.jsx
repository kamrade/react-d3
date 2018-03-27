import React, { Component } from 'react';
import { range as d3Range } from 'd3';
import DragZone from './shared/DragZone';

import OPTIONS from 'data/options';

let { margin, width, height } = OPTIONS.workspace;
let innerWidth  = width - (margin.left + margin.right);
let innerHeight = height - (margin.top + margin.bottom);
let radius      = OPTIONS.circle.radius;

let circlesData = d3Range(500).map((v, i) => ({
  x: Math.round(Math.random() * (innerWidth - radius*2 ) + radius + margin.left),
  y: Math.round(Math.random() * (innerHeight - radius*2 ) + radius + margin.top),
  index: i
}));

class DragzoneContainer extends Component {
  render() {
    return (
      <div className="DragzoneContainer">
        <div className="drag-zone">
          <DragZone
            margin={margin}
            width={width}
            height={height}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
            circlesData={circlesData}
            chartId="dragZone"
          />
        </div>
      </div>
    );
  }
}

export default DragzoneContainer;
