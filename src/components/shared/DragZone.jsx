import React, { Component } from 'react';

import {
  range as d3Range
} from 'd3';

class DragZone extends Component {

  constructor(props) {
    super(props);
    let radius = 20;
    this.state = {
      width: props.width || 800,
      height: props.height || 300,
      margin: props.margin || 0,
      tooltip: {
        display: false,
        data: {
          key: '',
          value: ''
        }
      },
      start_x: 0,
      start_y: 0,
      radius: radius,
      circlesData: d3Range(50).map(() => ({
        x: Math.round(Math.random() * (props.width - radius*2 ) + radius),
        y : Math.round(Math.random() * (props.height - radius*2 ) + radius)
      })),
      chartId: this.props.chartId || 'v2_chart'
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.updateSize.bind(this), false);
    this.setState({ width: this.props.width });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize.bind(this), false);
  }

  componentDidMount() {
    this.updateSize();
  }

  updateSize() {
    let currentWidth = this.elNode.clientWidth;
    if (currentWidth < this.props.width) {
      this.setState({
        width: currentWidth - 20
      })
    } else {
      this.setState({
        width: this.props.width
      })
    }
  }

  onMouseDown(e) {
    console.log('md');
  }

  render() {

    let { width, height } = this.state;
    let circles = this.state.circlesData.map((circ, index) => (
      <circle
        onMouseDown={this.onMouseDown.bind(this)}
        key={index}
        cx={circ.x}
        cy={circ.y}
        r={this.state.radius}
        fill={'yellow'}
        className='dragCircle'
      ></circle>)
    );

    return (
      <div ref={node => this.elNode = node} className="DragZone">
        DRAG ZONE

        <svg id={this.props.chartId} width={width} height={height}>
          <g className="rectsWrapper">
            <rect className="rect" width={width} height={height} fill={'black'}>

            </rect>
          </g>
          <g className="circlesWrapper">
            { circles }
          </g>
        </svg>

      </div>
    );
  }

}

export default DragZone;
