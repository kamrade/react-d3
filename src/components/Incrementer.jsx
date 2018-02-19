import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { increment, decrement } from '../actions';

class Incrementer extends Component {

  render() {
    return (
      <div className="Incrementer">
        <span>{this.props.value}</span>
        <button onClick={() => this.props.increment()}>Increment</button>
        <button onClick={() => this.props.decrement()}>Decrement</button>
      </div>
    );
  }

}

Incrementer.propTypes = {
  value: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    value: state.inc.value
  }
}

export default connect(mapStateToProps, { increment, decrement })(Incrementer);
