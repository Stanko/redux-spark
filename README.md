# Redux generator

Quick start:

```
npm start 
```

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Check their default [readme](RCA-README.md).

## What is this?

This is a try to reduce boilerplate code in react/redux/saga applications. Instead of writing action types, action creators, sagas and reducers, this library allows you only to write reducers. Everything else is generated under the hood. 

There is a lot of customizable options, so we think it covers a lot of use cases.

If you still need something that is not supported, it plays well with regular reducer/saga/types/creators combo.

## Example

### Before

```js
// actions/users.js
// ------ ACTION TYPES

export const GET_USER_LIST_START = 'GET_USER_LIST_START';
export const GET_USER_LIST_ERROR = 'GET_USER_LIST_ERROR';
export const GET_USER_LIST_SUCCESS = 'GET_USER_LIST_SUCCESS';

export const CLEAR_USER_LIST = 'CLEAR_USER_LIST';

// ------ ACTION CREATORS

export function getUserList() {
  return {
    type: GET_USER_LIST_START,
  };
}

export function clearUserList() {
  return {
    type: CLEAR_USER_LIST,
  };
}

// sagas/users.js
// ------ SAGAS

import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_USER_LIST_START,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_ERROR,
} from 'actions/users';

import api from 'api/users';

function* getUserList() {
  try {
    const data = yield call(api.getUserList);
    yield put({ type: GET_USER_LIST_SUCCESS, data });
  } catch (error) {
    yield put({ type: GET_USER_LIST_ERROR, error });
  }
}

export function* watchGetUserList() {
  yield takeLatest(GET_USER_LIST_START, getUserList);
}

export default [
  watchGetUserList(),
];

// reducers/users.js
// ------ REDUCER

import {
  GET_USER_LIST_ERROR,
  GET_USER_LIST_START,
  GET_USER_LIST_SUCCESS,
  CLEAR_USER_LIST,
} from 'actions/users';

const initialState = {
  users: null,
  loading: false,
  error: null,
};

const actionsMap = {
  [GET_USER_LIST_START]: (state) => {
    return {
      ...state,
      users: null,
      loading: true,
      error: null,
    };
  },
  [GET_USER_LIST_ERROR]: (state, action) => {
    return {
      ...state,
      users: null,
      loading: false,
      error: action.error,
    };
  },
  [GET_USER_LIST_SUCCESS]: (state, action) => {
    return {
      ...state,
      users: action.data,
      loading: false,
    };
  },
  [CLEAR_USER_LIST]: () => {
    return {
      ...state,
      users: null,
    };
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
```

### After

```js
import Reducer from '../reducer';
import api from 'api/users';

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

## Contributors

* [<img src="https://avatars2.githubusercontent.com/u/776788?v=4" width="30px;"/> Stanko Tadić](https://github.com/Stanko/)
* [<img src="https://avatars3.githubusercontent.com/u/5328461?v=4" width="30px;"/> Radoš Pavlićević](https://github.com/radospavlicevic)