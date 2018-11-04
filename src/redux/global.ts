import Reducer from 'src/generator/reducer';


const global = new Reducer('app', {
  isModalActive: false,
  settings: null,
  settingsError: null,
  settingsLoading: false,
});

global.addAction('toggleModal', (state:any, action:any) => {
  return {
    ...state,
    isModalActive: !state.isModalActive,
  };
});

// TODO add promise
global.addAsyncAction('getSettings', {
  start: (state:any, action:any) => {
    return {
      ...state,
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


export default global.getActionCreators();


