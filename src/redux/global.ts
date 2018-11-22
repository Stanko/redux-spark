import Reducer from '../generator/reducer';

// TODO Fake API
const api = {
  getSettings: () => new Promise(resolve => {
    // Fake errors
    if (Math.random() > 0.75) {
      throw { message: 'error!' };
    } else {
      setTimeout(() => {
        resolve({ users: [] });
      }, 500);
    }
  })
  .then((data) => {
    return data;
  }),
};

// Create app reducer
const global = new Reducer('global', {
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
global.addAsyncAction('getSettings', api.getSettings, {
  start: (state:any, action:any) => {
    return {
      ...state,
      settings: null,
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

// Export action creators
// {
//   toggleModal
//   getSettings
// }
export const {
  toggleModal,
  getSettings,
} = global.getActionCreators();

