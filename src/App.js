import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Incrementer from './components/Incrementer';
import About from './components/About';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header">
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/incrementer'>Incrementer</NavLink>
          <NavLink to='/about'>About</NavLink>
        </div>
        <div className="workspace">
          <Route exact path="/" render={props => <Redirect to="incrementer" />} />
          <Route exact path="/incrementer" component={Incrementer} />
          <Route exact path="/about" component={About} />
        </div>
      </div>
    );
  }
}

export default App;
