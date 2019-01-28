import generateAsyncReducer from '../spark/generate-async-reducer';

import api from '../api/api';

const actionCreators = generateAsyncReducer('usersList', api.getUsersList);

export const getUsersList = actionCreators.get;
export const resetUsersList = actionCreators.reset;
