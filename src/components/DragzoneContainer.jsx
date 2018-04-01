import React, { Component } from 'react';
import { range as d3Range } from 'd3';
import DragZone from './shared/DragZone';

import OPTIONS from 'data/options';

let { margin, width, height } = OPTIONS.workspace;
let { radius } = OPTIONS.circle;
let innerWidth  = width - (margin.left + margin.right);
let innerHeight = height - (margin.top + margin.bottom);


let circlesData = d3Range(50).map((v, i) => ({
  x: Math.round(Math.random() * (innerWidth - radius*2 ) + radius + margin.left),
  y: Math.round(Math.random() * (innerHeight - radius*2 ) + radius + margin.top),
  index: i
}));

// let circlesData = [{
//   x: 100, y: 100, index: 0
// }, {
//   x: 200, y: 200, index: 1
// }, {
//   x: 300, y: 300, index: 2
// }];

class DragzoneContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {

      // DRAGZONE SIZE
      width:  width,
      height: height,
      margin: margin,
      innerWidth:  innerWidth,
      innerHeight: innerHeight,

      // CONTAINER SIZE
      containerHeight: 0,
      containerWidth:  0,
      containerOffsetLeft: 0,
      containerOffsetTop:  0,
      cScrollX: 0,
      xScrollY: 0,

      // DATA
      circlesData: circlesData,

      // STATUS
      isScrollingRight: false,
      isScrollingLeft: false,
      isScrollingBottom: false,
      isScrollingTop: false
    };
  }

  setScrollingRight(status) {
    this.setState({
      isScrollingRight: status
    });
  }
  setScrollingLeft(status) {
    this.setState({
      isScrollingLeft: status
    });
  }
  setScrollingTop(status) {
    this.setState({
      isScrollingTop: status
    });
  }
  setScrollingBottom(status) {
    this.setState({
      isScrollingBottom: status
    });
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
          <button className="btn btn-sm btn-light btn-block">Start</button>
          <button className="btn btn-sm btn-light btn-block">Stop</button>
        </div>

        <div className="drag-zone--block">
          <div onScroll={this.onScrollHandler.bind(this)} ref={node => this.elNode = node} className="drag-zone--container">
            <DragZone

              width={this.state.width}
              height={this.state.height}
              margin={this.state.margin}

              containerHeight={this.state.containerHeight}
              containerWidth={this.state.containerWidth}

              containerOffsetLeft={this.state.containerOffsetLeft}
              containerOffsetTop={this.state.containerOffsetTop}
              cScrollX={this.state.cScrollX}
              cScrollY={this.state.cScrollY}
              scrollStep={OPTIONS.workspace.scrollStep}

              innerWidth={this.state.innerWidth}
              innerHeight={this.state.innerHeight}
              circlesData={this.state.circlesData}

              containerScrollX={this.containerScrollX.bind(this)}
              containerScrollY={this.containerScrollY.bind(this)}

              setScrollingRight={this.setScrollingRight.bind(this)}
              setScrollingLeft={this.setScrollingLeft.bind(this)}
              setScrollingBottom={this.setScrollingBottom.bind(this)}
              setScrollingTop={this.setScrollingTop.bind(this)}

            />
          </div>

          { this.state.isScrollingRight &&
            <div className="scroll-right-sign">
              <span className="oi" data-glyph="arrow-right"></span>
            </div>
          }

          { this.state.isScrollingLeft &&
            <div className="scroll-left-sign">
              <span className="oi" data-glyph="arrow-left"></span>
            </div>
          }

          { this.state.isScrollingBottom &&
            <div className="scroll-bottom-sign">
              <span className="oi" data-glyph="arrow-bottom"></span>
            </div>
          }

          { this.state.isScrollingTop &&
            <div className="scroll-top-sign">
              <span className="oi" data-glyph="arrow-top"></span>
            </div>
          }

        </div>
      </div>
    );
  }
}

export default DragzoneContainer;
