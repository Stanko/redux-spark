import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import './index.css';
import rootReducer from './redux/root-reducer';
import rootSaga from './redux/root-saga';
import registerServiceWorker from './registerServiceWorker';

const REDUX_DEVTOOLS_EXTENSION = '__REDUX_DEVTOOLS_EXTENSION__';

const sagaMiddleware = createSagaMiddleware();
const enhancer = getEnhancer(sagaMiddleware);

// Create store
const store = createStore(
    rootReducer,
    enhancer,
);

sagaMiddleware.run(rootSaga);

function getEnhancer(sagaMiddlewareParam:any) {
  const middleware = applyMiddleware(sagaMiddlewareParam, logger);
  let middlewareEnhancer;

  // Enable DevTools if browser extension is installed
  if (window[REDUX_DEVTOOLS_EXTENSION]) {
    middlewareEnhancer = compose(
        middleware,
        window[REDUX_DEVTOOLS_EXTENSION]()
    );
  } else {
    middlewareEnhancer = compose(middleware);
  }

  return middlewareEnhancer;
}

ReactDOM.render((
  <Provider store={ store }>
    <App />
  </Provider>
), document.getElementById('root') as HTMLElement);

registerServiceWorker();
