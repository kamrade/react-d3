var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');

var Axis = React.createClass({
  propTypes: {
    h:React.PropTypes.number,
    axis:React.PropTypes.func,
    axisType:React.PropTypes.oneOf(['x','y'])
  },
  componentDidUpdate: function() {
    this.renderAxis();
  },
  componentDidMount: function() {
    this.renderAxis();
  },
  renderAxis: function() {
    var node = ReactDOM.findDOMNode(this);
    d3.select(node)
      .call(this.props.axis);
  },
  render: function() {
    var translate = `translate(0, ${this.props.h})`;
    return (
      <g
        className={`axis axis-${this.props.axisType}`}
        transform={this.props.axisType=='x' ? translate : ''}
      ></g>
    );
  }
});

module.exports = Axis;
