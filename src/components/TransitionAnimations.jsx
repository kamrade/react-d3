import React, { Component } from 'react';
import BigCircle from './shared/BigCircle';

class TransitionAnimations extends Component {

  constructor(props) {
    super(props);

    this.state = {
      y: 10
    };
  }

  componentDidMount() {
    let that = this;
    this.clear = setTimeout(() => {
      that.setState({y: 200});
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.clear);
  }

  render() {
    return (
      <div className="TransitionAnimations">
        <svg width="100%" height="800">
          <BigCircle x={40} y={this.state.y} />
        </svg>
      </div>
    );
  }

}

export default TransitionAnimations;
