import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Incrementer from './components/Incrementer';
import TimerTransitions from './components/TimerTransitions';
import About from './components/About';

class App extends Component {
  render() {
    return (
      <div className="App p-2">
        <div className="header">
          <NavLink className='pr-2' to='/'>Home</NavLink>
          <NavLink className='pr-2' to='/incrementer'>Incrementer</NavLink>
          <NavLink className='pr-2' to='/about'>About</NavLink>
          <NavLink to='/timer-transitions'>Timer Transitions</NavLink>
        </div>
        <div className="workspace">
          <Route exact path="/" render={props => <Redirect to="incrementer" />} />
          <Route exact path="/incrementer" component={Incrementer} />
          <Route exact path="/about" component={About} />
          <Route exact path="/timer-transitions" component={TimerTransitions} />
        </div>
      </div>
    );
  }
}

export default App;
