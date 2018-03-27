import React, { Component } from 'react';

import {
  select as d3Select,
  transition as d3Transition,
  easeLinear as d3EaseLinear
} from 'd3';

import OPTIONS from 'data/options';

class DragZone extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: props.width || 320,
      height: props.height || 400,
      innerWidth: props.innerWidth || 320,
      innerHeight: props.innerheight || 400,
      margin: props.margin || 0,
      radius: OPTIONS.circle.radius,
      circlesData: this.props.circlesData,

      dragIndex: 0,
      drag: false,
      dragPreviousCoordinates: {
        x: 0,
        y: 0
      },
      dragCoordinates: {
        x: 140,
        y: 140
      }
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

  circleMouseDown(e) {
    let dataIndex = parseInt(e.target.getAttribute('data-index'), 10);
    let x = parseInt(e.target.getAttribute('cx'), 10);
    let y = parseInt(e.target.getAttribute('cy'), 10);

    this.setState({
      drag: true,
      dragIndex: dataIndex,
      dragCoordinates: { x, y },
      dragPreviousCoordinates: { x, y },
      circlesData: this.state.circlesData.filter(item => item.index !== dataIndex)
    }, () => {
      let that = this;
      window.onmouseup = (e) => that.windowMouseUp(e);
      window.onmousemove = (e) => that.windowMouseMove(e);
    });
  }

  windowMouseMove(event) {
    let leftLimit = OPTIONS.workspace.margin.left + OPTIONS.circle.radius;
    let topLimit = OPTIONS.workspace.margin.top + OPTIONS.circle.radius;
    let rightLimit = this.state.width - OPTIONS.workspace.margin.right - OPTIONS.circle.radius;
    let bottomLimit = this.state.height - OPTIONS.workspace.margin.bottom - OPTIONS.circle.radius;

    if (event.offsetX < leftLimit && event.offsetY < topLimit) {
      this.setState({ dragCoordinates: { x: leftLimit, y: topLimit } });
    } else if (event.offsetX > rightLimit && event.offsetY > bottomLimit) {
      this.setState({ dragCoordinates: { x: rightLimit, y: bottomLimit } });
    } else if (event.offsetX > rightLimit) {
      this.setState({ dragCoordinates: { x: rightLimit, y: event.offsetY } });
    } else if (event.offsetX < leftLimit) {
      this.setState({ dragCoordinates: { x: leftLimit, y: event.offsetY } });
    } else if (event.offsetY > bottomLimit) {
      this.setState({ dragCoordinates: { x: event.offsetX, y: bottomLimit } });
    } else if (event.offsetY < topLimit) {
      this.setState({ dragCoordinates: { x: event.offsetX, y: topLimit } });
    } else {
      this.setState({ dragCoordinates: { x: event.offsetX, y: event.offsetY } });
    }
  }

  windowMouseUp() {
    window.onmouseup = null;
    window.onmousemove = null;

    let { x, y } = this.state.dragCoordinates;

    if (x > this.state.width || y > this.state.height) {
      this.setState({
        drag: false,
        circlesData: [
          ...this.state.circlesData.slice(),
          {
            x: this.state.dragPreviousCoordinates.x,
            y: this.state.dragPreviousCoordinates.y,
            index: this.state.dragIndex
          }
        ]
      });
    } else {
      this.setState({
        drag: false,
        circlesData: [
          ...this.state.circlesData.slice(),
          { x, y, index: this.state.dragIndex }
        ]
      });
    }
  }

  render() {

    let { width, height } = this.state;

    let circles = this.state.circlesData.map((circ, index) => (
      <circle
        onMouseDown={this.circleMouseDown.bind(this)}
        data-index={circ.index}
        key={index}
        cx={circ.x}
        cy={circ.y}
        r={this.state.radius}
        fill={ OPTIONS.circle.color }
        className='dragCircle'
      />)
    );

    return (
      <div ref={node => this.elNode = node} className="DragZone">

        <svg id={this.props.chartId} width={width} height={height}>
          <g className="rectsWrapper">
            <rect rx={8} ry={8} className="rect" width={width} height={height} fill={OPTIONS.workspace.bg.color}>
            </rect>
          </g>
          <g className="circlesWrapper">
            { circles }
          </g>
          <g width={width} height={height} className="draggableArea">

            { this.state.drag &&
              <circle
                cx={this.state.dragCoordinates.x}
                cy={this.state.dragCoordinates.y}
                r={this.state.radius*1.5}
                fill={OPTIONS.circle.activeColor}
                className='dragCircle active'
              />
            }
          </g>
        </svg>

      </div>
    );
  }

}

export default DragZone;
