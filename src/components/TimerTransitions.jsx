import React, { Component } from 'react';
import Circle from './Circle';
import { timer as d3Timer } from 'd3';

class TimerTransitions extends Component {

  constructor(props) {
    super(props);

    this.state = {
      x: 10,
      x2: 200,
      vx: 1
    };
  }

  componentDidMount() {
    this.timer = d3Timer(() => {
      let { x, x2, vx } = this.state;
      x = x + vx;
      x2 = x2 -vx

      if (x > 200 || x < 10) {
        vx = -vx;
      }

      this.setState({x, x2, vx});
    });
  }

  componentWillUnmount() {
    this.timer.stop();
  }

  render() {
    return (
      <div className="TimerTransitions">
        <svg width="100%" height="200">
          <Circle x={this.state.x} y={50} />
          <Circle x={this.state.x2} y={100} />
        </svg>
      </div>
    );
  }

}

export default TimerTransitions;
