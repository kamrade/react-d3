var LineChart = React.createClass({

  
  showToolTip: function(e) {
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
  },
  hideToolTip: function(e) {
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
  },
  

  render: function() {

    return(
      <div>
        <h6 className="chart-title">{title}</h6>
        <svg
          id={this.props.chartId}
          width={this.state.width}
          height={this.state.height}
        >
          <g className="chart-group" transform={transform}>

            <AxisAndGrid
              data={data}
              x={x}
              y={y}
              w={w}
              h={h}
            />
            <g className="line-group">
              <path
                className="line"
                d={line(data)}
                strokeLinecap="round"
              ></path>
            </g>
            <Dots
              data={data}
              x={x}
              y={y}
              showToolTip={this.showToolTip}
              hideToolTip={this.hideToolTip}
            />
            <Tooltip
              tooltip={this.state.tooltip}
            />
          </g>
        </svg>
      </div>
    );
  }
});

module.exports = LineChart;
