# Redux Spark

[ ] think of a way to pass action types to a custom user saga
[ ] reducer name validation (regex?)


## What is this?

Spark is a thin wrapper around [redux](https://redux.js.org/) and [redux-saga](https://redux-saga.js.org/). We tried to reduce boilerplate code in react/redux/saga applications. Instead of writing action types, action creators, sagas and reducer, Spark allows you to call a single function and generate everything under the hood.

If you want to customize anything, only thing you need to write is reducer (again, everything else is generated). There is a lot of customizable options, so we think it covers a lot of use cases. If you still need something that is not supported, it plays nicely with a regular reducer/saga/types/creators setup.

## Example

Spark comes with pre built generator. `generateAsyncReducer` accepts two params - reducer's name and function that returns a promise. Hopefully [live example](TODO) will make it clearer.

```js
import generateAsyncReducer from 'redux-spark/generators';
import api from '../api';

const actionCreators = generateAsyncReducer('users', api.getUsers);

export const {
  get,
  reset,
} = actionCreators;
```

Code above generates:

* Four actions types - one for reset action and three for async get action
* Two action creators - `get` and `reset`
* Saga and watcher - for async get action using `getLatest`
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
import Reducer from 'redux-spark';
import api from './api';

// Create reducer
const users = new Reducer('users', {
  users: null,
  error: null,
  loading: false,
});

// Add async action
users.addAsyncAction('getUsers', api.getUsers, {
  start: (state, action) => {
    return {
      ...state,
      users: null,
      error: null,
      loading: true,
    };
  },
  error: (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  },
  success: (state, action) => {
    return {
      ...state,
      users: action.data,
      loading: false,
    };
  },
});

// Add sync action
global.addAction('clearUserList', () => {
  return {
    ...state,
    users: null,
  };
});

// Export action creators
export const {
  getUsers,
  clearUserList,
} = users.getActionCreators();
```


## Development

Quick start:

```
npm start 
```

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Check their default [readme](RCA-README.md).

## Contributors

* [<img src="https://avatars2.githubusercontent.com/u/776788?v=4" width="30px;"/> Stanko Tadić](https://github.com/Stanko/)
* [<img src="https://avatars3.githubusercontent.com/u/5328461?v=4" width="30px;"/> Radoš Pavlićević](https://github.com/radospavlicevic)

