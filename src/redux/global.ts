import Reducer from '../generator/reducer';

import api from '../api';

// Create app reducer
const global = new Reducer('global', {
  isModalActive: false,
  settings: null,
  settingsError: null,
  settingsLoading: false,
});

// Add sync action
export const toggleModal = global.addAction('toggleModal', (state:any, action:any) => {
  return {
    ...state,
    isModalActive: !state.isModalActive,
  };
});

// Add async action
export const getSettings = global.addAsyncAction('getSettings', api.getSettings, {
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