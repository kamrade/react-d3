import React, { Component } from 'react';

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
      radius: radius,
      circlesData: this.props.circlesData,
      chartId: this.props.chartId || 'v2_chart',

      dragIndex: 0,
      dragPreviousCoordinates: {
        x: 0,
        y: 0
      },
      drag: false,
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
    if (event.offsetX > 20 || event.offsetX > 20) {
      this.setState({
        dragCoordinates: { x: event.offsetX, y: event.offsetY }
      });
    } else {
      this.setState({
        dragCoordinates: { x: 20, y: 20 }
      });
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
        fill={'yellow'}
        className='dragCircle'
      />)
    );

    return (
      <div ref={node => this.elNode = node} className="DragZone">

        <svg id={this.props.chartId} width={width} height={height}>
          <g className="rectsWrapper">
            <rect className="rect" width={width} height={height} fill={'black'}>

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
                r={this.state.radius}
                fill={'red'}
                className='dragCircle'
              />
            }

          </g>
        </svg>

      </div>
    );
  }

}

export default DragZone;
