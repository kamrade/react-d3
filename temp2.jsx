var React = require('react');
var d3 = require('d3');
var Axis = require('Axis');
var Grid = require('Grid');

var AxisAndGrid = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    x: React.PropTypes.func,
    y: React.PropTypes.func,
    h: React.PropTypes.number,
    w: React.PropTypes.number
  },
  render: function() {
    var x = this.props.x;
    var y = this.props.y;
    var data = this.props.data;
    var w = this.props.w;
    var h = this.props.h;

    var yAxis = d3.axisLeft(y)
      .ticks(5);

    var xAxis = d3.axisBottom(x)
      .ticks(d3.timeDay.every(5))
      .tickFormat(d3.timeFormat('%b %e'));

      // .tickValues(data.map(function(d,i){
      //  if(i > 0) return d.date;
      // }).splice(1));

    var yGrid = d3.axisLeft(y)
      .ticks(5)
      .tickSize(-w, 0, 0)
      .tickFormat("");

    return (
      <g className="axis-and-grid">
        <Axis
          axis={xAxis}
          h={h}
          axisType='x'
        />
        <Axis
          axis={yAxis}
          h={h}
          axisType='y'
        />
        <Grid
          grid={yGrid}
          h={h}
          gridType='y'
        />
      </g>
    );
  }
});

module.exports = AxisAndGrid;
