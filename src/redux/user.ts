import api from "../api/api";
import Reducer from "../spark/reducer";

// Create reducer
const userReducer = new Reducer('user', {
  user: null,
  error: null,
  loading: false,
});

// Add async action
const get = userReducer.addAsyncAction('getUser', api.getUser, {
  start: (state:any) => {
    return {
      ...state,
      user: null,
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
      user: action.data,
      loading: false,
    };
  },
});

// Export async action
export const getUser = (id:string) => get({ id });
