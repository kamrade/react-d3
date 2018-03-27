import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Incrementer from './components/Incrementer';
import TimerTransitions from './components/TimerTransitions';
import TransitionAnimations from './components/TransitionAnimations';
import ScatterPlotD3 from './components/ScatterPlotD3';
import LineChartContainer from './components/LineChartContainer';

class App extends Component {
  render() {
    return (
      <div className="App p-2">
        <div className="header">
          <NavLink className='pr-2' to='/incrementer'>Incrementer</NavLink>
          <NavLink className='pr-2' to='/timer-transitions'>Timer Transitions</NavLink>
          <NavLink className='pr-2' to='/transition-animations'>Transition Animations</NavLink>
          <NavLink className='pr-2' to='/scatterplot'>Scatterplot</NavLink>
          <NavLink to='/linechart'>Linechart</NavLink>
        </div>
        <div className="workspace">
          <Route exact path='/' render={props => <Redirect to='incrementer' />} />
          <Route exact path='/incrementer' component={Incrementer} />
          <Route exact path='/timer-transitions' component={TimerTransitions} />
          <Route exact path='/transition-animations' component={TransitionAnimations} />
          <Route exact path='/scatterplot' component={ScatterPlotD3} />
          <Route exact path='/linechart' component={LineChartContainer} />
        </div>
      </div>
    );
  }
}

export default App;
