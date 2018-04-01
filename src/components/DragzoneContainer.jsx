import React, { Component } from 'react';
import { range as d3Range } from 'd3';
import DragZone from './shared/DragZone';

import OPTIONS from 'data/options';

let { margin, width, height } = OPTIONS.workspace;
let { radius } = OPTIONS.circle;
let innerWidth  = width - (margin.left + margin.right);
let innerHeight = height - (margin.top + margin.bottom);

let circlesData = d3Range(30).map((v, i) => ({
  x: Math.round(Math.random() * (innerWidth - radius*2 ) + radius + margin.left),
  y: Math.round(Math.random() * (innerHeight - radius*2 ) + radius + margin.top),
  index: i
}));

// let circlesData = [{
//   x: 100,
//   y: 100,
//   index: 0
// }, {
//   x: 200,
//   y: 200,
//   index: 1
// }, {
//   x: 300,
//   y: 300,
//   index: 2
// }];

class DragzoneContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      containerHeight: 0,
      containerWidth: 0,
      containerOffsetLeft: 0,
      containerOffsetTop: 0,
      cScrollX: 0,
      xScrollY: 0
    };
  }

  componentDidMount() {
    this.setState({
      containerHeight: this.elNode.offsetHeight,
      containerWidth: this.elNode.offsetWidth,
      containerOffsetLeft: this.elNode.getBoundingClientRect().left,
      containerOffsetTop: this.elNode.getBoundingClientRect().top,
      cScrollX: this.elNode.scrollLeft,
      cScrollY: this.elNode.scrollTop
    });
  }

  componentWillUnmount() {
    clearInterval(this.autoScrollX);
  }

  containerScrollX(offset) {
    this.elNode.scrollLeft = this.elNode.scrollLeft + offset;
    this.setState({
      cScrollX: this.elNode.scrollLeft
    });
  }

  containerScrollY(offset) {
    this.elNode.scrollTop = this.elNode.scrollTop + offset;
    this.setState({
      cScrollY: this.elNode.scrollTop
    });
  }

  onScrollHandler(event) {
    this.setState({
      cScrollX: this.elNode.scrollLeft,
      cScrollY: this.elNode.scrollTop
    })
  }

  render() {
    return (
      <div className="d-flex flex-row">
        <div className="sidebar p-2">
          <button className="btn btn-sm btn-primary">Test</button>
        </div>

        <div className="drag-zone--block">
          <div onScroll={this.onScrollHandler.bind(this)} ref={node => this.elNode = node} className="drag-zone--container">
            <DragZone
              width={width}
              height={height}
              margin={margin}

              containerHeight={this.state.containerHeight}
              containerWidth={this.state.containerWidth}
              containerOffsetLeft={this.state.containerOffsetLeft}
              containerOffsetTop={this.state.containerOffsetTop}
              cScrollX={this.state.cScrollX}
              cScrollY={this.state.cScrollY}
              scrollStep={OPTIONS.workspace.scrollStep}

              innerWidth={innerWidth}
              innerHeight={innerHeight}
              circlesData={circlesData}
              chartId="dragZone"

              containerScrollX={this.containerScrollX.bind(this)}
              containerScrollY={this.containerScrollY.bind(this)}

            />
          </div>
          <div className="scroll-right-sign">
            >
          </div>
        </div>
      </div>
    );
  }
}

export default DragzoneContainer;
