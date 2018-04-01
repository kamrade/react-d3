import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  // select as d3Select,
  // transition as d3Transition,
  // easeLinear as d3EaseLinear
} from 'd3';

import OPTIONS from 'data/options';

class DragZone extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: props.width,
      height: props.height,
      innerWidth: props.innerWidth,
      innerHeight: props.innerheight,
      margin: props.margin,
      scrollStep: props.scrollStep,


      radius: OPTIONS.circle.radius,
      circlesData: this.props.circlesData,

      dragIndex: 0,
      drag: false,
      dragPreviousCoordinates: {
        x: 0,
        y: 0
      },
      dragCoordinates: {
        x: 0,
        y: 0
      }
    };
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

    let pointX = event.clientX - this.props.containerOffsetLeft + this.props.cScrollX;
    let pointY = event.clientY - this.props.containerOffsetTop  + this.props.cScrollY;

    if (pointX < this.props.cScrollX + 64) {
      this.props.containerScrollX(-1*this.state.scrollStep);
    }
    if (pointY < this.props.cScrollY + 64) {
      this.props.containerScrollY(-1*this.state.scrollStep);
    }

    // двигаем скролл окна вправо
    if (pointX > this.props.containerWidth + this.props.cScrollX - 64) {
      this.props.setScrolling(true);
      this.props.containerScrollX(this.state.scrollStep);
    } else {
      this.props.setScrolling(false);
    }

    // двигаем скролл окна вниз
    if (pointY > this.props.containerHeight - 64) {
      this.props.containerScrollY(this.state.scrollStep);
    }

    // ограничение по перемещению
    if (pointX < leftLimit && pointY < topLimit) {
      // top + left
      this.setState({ dragCoordinates: { x: leftLimit, y: topLimit } });
    } else if (pointX > rightLimit && pointY > bottomLimit) {
      // bottom + right
      this.setState({ dragCoordinates: { x: rightLimit, y: bottomLimit } });
    } else if(pointX < leftLimit && pointY > bottomLimit) {
      // left + bottom
      this.setState({ dragCoordinates: { x: leftLimit, y: bottomLimit } });
    } else if(pointX > rightLimit && pointY < topLimit) {
      // right + top
      this.setState({ dragCoordinates: { x: rightLimit, y: topLimit } });
    } else if (pointX > rightLimit) {
      // right_side
      this.setState({ dragCoordinates: { x: rightLimit, y: pointY } });
    } else if (pointX < leftLimit) {
      // left_side
      this.setState({ dragCoordinates: { x: leftLimit, y: pointY } });
    } else if (pointY > bottomLimit) {
      // bottom_side
      this.setState({ dragCoordinates: { x: pointX, y: bottomLimit } });
    } else if (pointY < topLimit) {
      // top_side
      this.setState({ dragCoordinates: { x: pointX, y: topLimit } });
    } else {
      // move
      this.setState({ dragCoordinates: { x: pointX, y: pointY } });
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
            <rect className="rect" width={width} height={height} fill={OPTIONS.workspace.bg.color}>
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
                r={this.state.radius*1.2}
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

DragZone.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.object.isRequired,
  innerWidth: PropTypes.number.isRequired,
  innerHeight: PropTypes.number.isRequired,
  scrollStep: PropTypes.number,

  containerHeight: PropTypes.number.isRequired,
  containerWidth: PropTypes.number.isRequired,
  containerOffsetLeft: PropTypes.number.isRequired,
  containerOffsetTop: PropTypes.number.isRequired
}

export default DragZone;
