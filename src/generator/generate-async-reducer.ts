import Reducer from './reducer';
import { capitalize } from './utils';

export default function generateAsyncReducer(name:string, asyncMethod:any) {
  const initialState = {
    data: null,
    error: null,
    loading: false,
    params: null,
  };

  // Create reducer
  const reducer = new Reducer(name, initialState);

  // Add get data action
  const get = reducer.addAsyncAction(`get${ capitalize(name) }`, asyncMethod, {
    start: (state:any, action:any) => {
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
        params: null, 
      };
    },
    error: (state:any, action:any) => {
      return {
        ...state,
        error: action.error,
        loading: false,
        params: action.params,
      };
    },
    success: (state:any, action:any) => {
      return {
        ...state,
        data: action.data,
        loading: false,
        params: action.params,
      };
    },
  });

  const reset = reducer.addAction(`reset${ capitalize(name) }`, () => initialState);

  return {
    get,
    reset,
  };
};

