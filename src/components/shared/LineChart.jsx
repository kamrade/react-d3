import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  version as d3Version,
  timeParse as d3TimeParse,
  scaleTime as d3ScaleTime,
  scaleLinear as d3ScaleLinear,
  extent as d3Extent,
  max as d3Max,
  line as d3Line,
  curveCatmullRom as d3CurveCatmullRom
} from 'd3';

import AxisAndGrid from './line-chart/AxisAndGrid';
import Dots from './line-chart/Dots';
import Tooltip from './line-chart/Tooltip';

console.log(`d3 version ${d3Version}`);

class LineChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: props.width || 800,
      height: props.height || 300,
      data: props.data || [],
      margin: props.margin || 0,
      tooltip: {
        display: false,
        data: {
          key: '',
          value: ''
        }
      },
      chartId: props.chartId || 'v1_chart'
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

  showTooltip(e) {
    e.target.setAttribute('fill', '#fff');
    this.setState({
      tooltip: {
        display: true,
        data: {
          key: e.target.getAttribute('data-key'),
          value: e.target.getAttribute('data-value')
        },
        pos: {
          x: e.target.getAttribute('cx'),
          y: e.target.getAttribute('cy')
        }
      }
    });
  }

  hideTooltip(e) {
    e.target.setAttribute('fill', '#7dc7f4');
    this.setState({
      tooltip: {
        display: false,
        data: {
          key: '',
          value: ''
        }
      }
    });
  }

  render() {

    let { data, margin, width, height, title } = this.state;
    let w = width - (margin.left + margin.right);
    let h = height - (margin.top + margin.bottom);

    let parseDate = d3TimeParse('%m-%d-%Y');

    data.forEach(d => {
      d.date = parseDate(d.day);
    });

    let x = d3ScaleTime()
      .domain(d3Extent(data, d => d.date)).rangeRound([0,w]);
    let y = d3ScaleLinear()
      .domain([0, d3Max(data, d => d.count + 100)]).range([h, 0]);

    let line = d3Line()
      .x(d => x(d.date))
      .y(d => y(d.count))
      .curve(d3CurveCatmullRom.alpha(0.5));

    let transform = `translate(${margin.left}, ${margin.top})`;

    return (
      <div ref={node => this.elNode = node} className="LineChart">
        <h6 className="chart-title">{title}</h6>
        <svg id={this.props.chartId} width={width} height={height}>
          <g className="chart-group" transform={transform}>

            <AxisAndGrid x={x} y={y} w={w} h={h} />

            <g className="line-group">
              <path className="line" d={line(data)} strokeLinecap="round" ></path>
            </g>

            <Dots data={data} x={x} y={y}
              showTooltip={this.showTooltip.bind(this)} hideTooltip={this.hideTooltip.bind(this)}/>

            <Tooltip
              tooltip={this.state.tooltip}
            />
          </g>
        </svg>
      </div>
    );
  }

}

LineChart.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  chartId: PropTypes.string,
  title: PropTypes.string
}

export default LineChart;
