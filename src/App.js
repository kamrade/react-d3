import React, { Component } from 'react';
import Incrementer from './components/Incrementer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        Application
        <Incrementer/>
      </div>
    );
  }
}

export default App;
