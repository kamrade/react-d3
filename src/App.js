import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import DragzoneContainer from './components/DragzoneContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header">
          <NavLink className='pr-2' to='/dragzone'>Dragzone</NavLink>
        </div>
        <div className="workspace">
          <Route exact path='/' render={props => <Redirect to='dragzone' />} />
          <Route exact path='/dragzone' component={DragzoneContainer} />
        </div>
      </div>
    );
  }
}

export default App;
