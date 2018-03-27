import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  timeFormat as d3TimeFormat
} from 'd3';

class Dots extends Component {

  onMouseOver(e) {
    e.target.style.r = 12;
    this.props.showTooltip(e);
  }

  onMouseLeave(e) {
    e.target.style.r = 7;
    this.props.hideTooltip(e);
  }

  render() {
    let _self  = this;

    // remove last and first points
    let dataIn = this.props.data;
    let data = dataIn.slice();
    data = data.splice(1);
    data.pop();

    let circles = data.map((d, i) => (
        <circle
          className="dot"
          r="7"
          cx={_self.props.x(d.date)}
          cy={_self.props.y(d.count)}
          fill="#7dc7f4"
          stroke="#3f5175"
          strokeWidth="5px"
          key={i}
          onMouseOver={this.onMouseOver.bind(this)}
          onMouseLeave={this.onMouseLeave.bind(this)}
          data-key={d3TimeFormat('%b %e')(d.date)}
          data-value={d.count}
        ></circle>
    ))


    return (
      <g className="dots-group">
        {circles}
      </g>
    );
  }

}

Dots.propTypes = {
  data: PropTypes.array,
  x: PropTypes.func,
  y: PropTypes.func
}

export default Dots;
