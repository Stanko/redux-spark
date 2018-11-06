import api from 'src/api/index';
import Reducer from 'src/generator/reducer';

// Create app reducer
const global = new Reducer('global', {
  isActive: false,
  testAsyncData: null,
  testAsyncDataError: null,
  testAsyncDataLoading: false,
});

// Add sync action
global.addAction('toggleFlag', (state:any, action:any) => {
  return {
    ...state,
    isActive: !state.isActive,
  };
});

// Add async action
global.addAsyncAction('getTestAsyncData', api.fetchTestAsync, {
  start: (state:any, action:any) => {
    return {
      ...state,
      testAsyncData: null,
      testAsyncDataError: null,
      testAsyncDataLoading: true,
    };
  },
  // tslint:disable-next-line object-literal-sort-keys
  error: (state:any, action:any) => {
    return {
      ...state,
      testAsyncDataError: action.error,
      testAsyncDataLoading: false,
    };
  },
  success: (state:any, action:any) => {
    return {
      ...state,
      testAsyncData: action.data,
      testAsyncDataLoading: false,
    };
  },
});

// Export action creators
// {
//   toggleFlagValue
//   getSettings
// }
export const {
  toggleFlag,
  getTestAsyncData,
} = global.getActionCreators();