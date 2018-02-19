import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { increment, decrement } from '../actions';

class Incrementer extends Component {

  render() {
    return (
      <div className="Incrementer">
        <span>{this.props.value}</span>
        <button className='btn btn-sm btn-outline-primary mx-1' onClick={() => this.props.increment()}>Increment</button>
        <button className='btn btn-sm btn-outline-primary' onClick={() => this.props.decrement()}>Decrement</button>
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
