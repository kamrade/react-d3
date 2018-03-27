import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  select as d3Select
} from 'd3';

class Axis extends Component {

  componentDidUpdate() {
    this.renderAxis();
  }

  componentDidMount() {
    this.renderAxis();
  }

  renderAxis() {
    d3Select(this.elNode)
      .call(this.props.axis);
  }

  render() {
    let translate = `translate(0, ${this.props.h})`;
    return (
      <g
        ref={node => this.elNode = node}
        className={`axis axis-${this.props.axisType}`}
        transform={this.props.axisType === 'x' ? translate : ''}
      ></g>
    );
  }

}

Axis.propTypes = {
  h: PropTypes.number,
  axis: PropTypes.func,
  axisType: PropTypes.oneOf(['x','y'])
}

export default Axis;
