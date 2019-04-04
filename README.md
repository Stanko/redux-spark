# Redux Spark

## Please note that examples and documentation are incomplete.

[![npm version](https://img.shields.io/npm/v/redux-spark.svg?style=flat-square)](https://www.npmjs.com/package/redux-spark)
[![npm downloads](https://img.shields.io/npm/dm/redux-spark.svg?style=flat-square)](https://www.npmjs.com/package/redux-spark)

## What is this?

Spark is a thin wrapper around [redux](https://redux.js.org/) and [redux-saga](https://redux-saga.js.org/). We tried to reduce boilerplate code in react/redux/saga applications. Instead of writing action types, action creators, sagas and reducer, Spark allows you to call a single function and generate everything under the hood.

If you want to customize anything, only thing you need to write is a reducer (again, everything else is generated). There is a lot of customizable options, so we think it covers a lot of use cases. If you still need something that is not supported, it plays nicely with a standard reducer/saga/types/creators setup.

## Example

Spark comes with pre built generator. `generateAsyncReducer` accepts two params - reducer's name and function that returns a promise. Hopefully [live example](TODO) will make it clearer.

```js
import { generateAsyncReducer } from 'redux-spark';
import api from '../api';

// api.getUsers returns a promise
const actionCreators = generateAsyncReducer('users', api.getUsers);

export const {
  get,
  reset,
} = actionCreators;
```

Code above generates:

* Four actions types - one for `reset` action and three for async `get` action
* Two action creators - `get` and `reset`
* Saga and watcher - for async `get` action using `getLatest`
* Reducer function - with the following state:
  ```js
  {
    // data returned from api.getUsers
    data: object,
    // error if api.getUsers fails
    error: object,
    // loading indicators
    loading: boolean,
    // all params passed to "get" action (i.g. pagination offset and per page)
    params: object,
  }
  ```

You can write your generators, we advise you to check the source in [generate-async-reducer.ts](TODO), it should be pretty self explanatory.

Find the list of all generators [here](TODO).

## Custom reducer

```js
import { Reducer } from 'redux-spark';
import api from './api';

// Create app reducer
const global = new Reducer('global', {
  isModalActive: false,
  settings: null,
  settingsError: null,
  settingsLoading: false,
});

// Add sync action
export const toggleModal = global.addAction('toggleModal', (state:any, action:any) => {
  return {
    ...state,
    isModalActive: !state.isModalActive,
  };
});

// Add async action
export const getSettings = global.addAsyncAction('getSettings', api.getSettings, {
  start: (state:any, action:any) => {
    return {
      ...state,
      settings: null,
      settingsError: null,
      settingsLoading: true,
    };
  },
  error: (state:any, action:any) => {
    return {
      ...state,
      settingsError: action.error,
      settingsLoading: false,
    };
  },
  success: (state:any, action:any) => {
    return {
      ...state,
      settings: action.data,
      settingsLoading: false,
    };
  },
});
```

## API

Before diving into API, be sure to check examples above.

### Spark core

`getAllReducers` method will return array containing all of the generated reducers. You need to add it to your root reducer (only once).

```js
import { combineReducers } from 'redux';
import spark from 'redux-spark';

export default combineReducers({
  // You can put any additional reducers here
  ...spark.getAllReducers(),
});
```

Same thing for sagas. `getAllSagas` will return an array containing all of the generated sagas. You need to yield them in your root saga.

```js
import { all } from 'redux-saga/effects';
import spark from 'redux-spark';

export default function* rootSaga() {
  yield all([
    // You can put any additional sagas here
    ...spark.getAllSagas(),
  ]);
}
```

### Async Reducer Generator

### Reducer

  * Constructor
    * `name` string
    * `initialState` any type (you can use plain object or for example Immutable instance)

    Returns `Reducer` instance.

  * `addAction`
    * `actionName` string, camel cased (e.g. `toggleModal`, generated action type will be `TOGGLE_MODAL`).
    * `handler` reducer function with two params `state` and `action`.

    Returns action creator function.

  * `addAsyncAction`
    * `actionName` string, camel cased (e.g. `getUsers`, generated action types will be `GET_USERS_START`, `GET_USERS_SUCCESS`, `GET_USERS_ERROR`).
    * `asyncMethod` function that returns a promise. This promise will be resolved in the generated saga creator, and data returned to the handler.
    * `handlers` map (object) with `start/success/end` keys, each being reducer function with two params `state` and `action`. Each handler responds to one of the three generated actions.
    * `sagaOptions` object, if you want to customize saga effect *or* pass a custom saga, you need to pass it in this object.
      * Custom effect:
        ```js
        { effect: takeEvery }
        ```
      * Custom saga creator (it needs to be a function, so Spark can pass object with generated action types).
        ```js
        { sagaCreator: (actionsTypes) => yourCustomSaga }
        ```
        `actionsTypes` is an object with `start/success/end` keys, each one corresponding to the action type. (e.g. `GET_USERS_START`, `GET_USERS_SUCCESS`, `GET_USERS_ERROR`)

    Returns action creator function.

    By default generated saga will use `takeLatest` effect.

## Development

Quick start:

```
npm start
```

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Check their default [readme](RCA-README.md).

## Contributors

* [<img src="https://avatars2.githubusercontent.com/u/776788?v=4" width="30px;"/> Stanko Tadić](https://github.com/Stanko/)
* [<img src="https://avatars3.githubusercontent.com/u/5328461?v=4" width="30px;"/> Radoš Pavlićević](https://github.com/radospavlicevic)
