import AsyncTrigger from '../components/AsyncTrigger/AsyncTrigger';
import SyncTrigger from '../components/SyncTrigger/SyncTrigger';
import TemplateAsyncTrigger from '../components/TemplateAsyncTrigger/TemplateAsyncTrigger';

// todoItem
// global
// todoList
export const config = [
  {
    reducerName: 'usersList',
    label: 'Template async action',
    trigger: TemplateAsyncTrigger,
    code: `import { generateAsyncReducer } from 'redux-spark';
import api from '../api/api';

const actionCreators = generateAsyncReducer('usersList', api.getUsersList);

export const getUsersList = actionCreators.get;
export const resetUsersList = actionCreators.reset;`
  },
  {
    reducerName: 'user',
    label: 'Async action',
    trigger: AsyncTrigger,
    code: `import { Reducer } from "redux-spark";
import api from "../api/api";

// Create reducer
const userReducer = new Reducer('user', {
  user: null,
  error: null,
  loading: false,
});

// Add async action
const get = userReducer.addAsyncAction('getUser', api.getUser, {
  start: (state) => {
    return {
      ...state,
      user: null,
      error: null,
      loading: true,
    };
  },
  error: (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  },
  success: (state, action) => {
    return {
      ...state,
      user: action.data,
      loading: false,
    };
  },
});

// Export async action
export const getUser = (id:string) => get({ id });`,
  },
  {
    reducerName: 'global',
    label: 'Sync action',
    trigger: SyncTrigger,
    code: `import { Reducer } from 'redux-spark';

// Create app reducer
const global = new Reducer('global', {
  toggleFlag: false,
  title: '',
});

// Add sync action
export const toggleFlag = global.addAction('toggleFlag', (state) => {
  return {
    ...state,
    toggleFlag: !state.toggleFlag,
  };
});

const setTitleCreator = global.addAction('setTitle', (state, action: any) => {
  return {
    ...state,
    title: action.params.title,
  };
});

export const setTitle = (title:string) => setTitleCreator({ title });`
  },
];

export const jsonTreeTheme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633'
};
