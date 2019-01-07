import generateAsyncReducer from '../spark/generate-async-reducer';

import api from '../api/api';

const actionCreators = generateAsyncReducer('todoList', api.getTodoList);

export const getTodoList = actionCreators.get;
export const resetTodoList = actionCreators.reset;
