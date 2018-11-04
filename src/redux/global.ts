import Reducer from 'src/generator/reducer';

// TODO Fake API
const api = {
  getSettings: () => new Promise(resolve => {
    // TODO
  }),
};

// Create app reducer
const global = new Reducer('app', {
  isModalActive: false,
  settings: null,
  settingsError: null,
  settingsLoading: false,
});

// Add sync action
global.addAction('toggleModal', (state:any, action:any) => {
  return {
    ...state,
    isModalActive: !state.isModalActive,
  };
});

// Add async action
global.addAsyncAction('getSettings', api.getSettings(), {
  start: (state:any, action:any) => {
    return {
      ...state,
      settingsError: null,
      settingsLoading: true,
    };
  },
  // tslint:disable-next-line object-literal-sort-keys
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

// Export action creators
// {
//   toggleModal
//   getSettings
// }
export default global.getActionCreators();


