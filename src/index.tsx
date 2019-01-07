import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import './base.css';
import rootReducer from './redux/root-reducer';
import rootSaga from './redux/root-saga';
import registerServiceWorker from './registerServiceWorker';

const sagaMiddleware = createSagaMiddleware();

// In development mode beside sagaMiddleware
// logger and DevTools are added
const middleware = applyMiddleware(sagaMiddleware);
let enhancer;

// Enable DevTools if browser extension is installed
if ((window as any).__REDUX_DEVTOOLS_EXTENSION__) { 
  enhancer = compose(
    middleware,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
  );
} else {
  enhancer = compose(middleware);
}

const store = createStore(
  rootReducer,
  enhancer
);

// Run sagas
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
