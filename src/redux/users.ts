import { generateAsyncReducer } from '../spark';

import api from '../api';


const actionCreators = generateAsyncReducer('users', api.getUsers);

// TODO Document
// export const getUsers = (id) => actionCreators.get({ id });

export const {
  get,
  reset,
} = actionCreators;