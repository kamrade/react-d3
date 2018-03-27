import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  select as d3Select
} from 'd3';

class Grid extends Component {

  componentDidMount() {
    this.renderGrid();
  }

  componentDidUpdate() {
    this.renderGrid();
  }

  renderGrid() {
    d3Select(this.elNode).call(this.props.grid);
  }

  render() {
    var translate = `translate(0, ${this.props.h})`;
    return (
      <g
        ref={node => this.elNode = node}
        className="y-grid"
        transform={this.props.gridType === 'x' ? translate : ''}
      ></g>
    );
  }

}

Grid.propTypes = {
  h: PropTypes.number,
  grid: PropTypes.func,
  gridType: PropTypes.oneOf(['x','y'])
}

export default Grid;
