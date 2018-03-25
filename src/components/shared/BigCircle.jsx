import React, { Component } from 'react';
import { select as d3Select, easeBounceOut } from 'd3';

class BigCircle extends Component {

  constructor(props) {
    super(props);

    const { x, y } = props;
    this.state = { x, y };
  }

  componentWillReceiveProps(newProps) {
    d3Select(this.circleNode)
      .transition()
      .duration(1500)
      .ease(easeBounceOut)
      .attr('cy', newProps.y)
      .on('end', () => this.setState({ y: newProps.y }));
  }

  render() {
    return (
      <circle cx={this.state.x} cy={this.state.y} ref={node => this.circleNode = node} r={5}/>
    );
  }

}

export default BigCircle;
