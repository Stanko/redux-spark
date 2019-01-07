import api from "../api/api";
import Reducer from "../spark/reducer";

// Create reducer
const todoItem = new Reducer('todoItem', {
  data: null,
  error: null,
  loading: true,
});

// Add async action
const getTodoItemCreator = todoItem.addAsyncAction('getTodoItem', api.getTodoItem, {
  start: (state:any) => {
    return {
      ...state,
      data: null,
      error: null,
      loading: true,
    };
  },
  error: (state:any, action:any) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  },
  success: (state:any, action:any) => {
    return {
      ...state,
      data: action.data,
      error: false,
    };
  },
})

// Export async action
export const getTodoItem = (id:string) => getTodoItemCreator({ id });
