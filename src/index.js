import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/rootReducer';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let store;
let mode = process.env.NODE_ENV;

if (mode === 'development') {
  console.log(mode + " mode");
  store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  );
} else {
  store = createStore(rootReducer, applyMiddleware(thunk));
}


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path='/' component={App} />
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
