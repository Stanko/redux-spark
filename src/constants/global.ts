import AsyncTrigger from '../components/AsyncTrigger/AsyncTrigger';
import SyncTrigger from '../components/SyncTrigger/SyncTrigger';
import TemplateAsyncTrigger from '../components/TemplateAsyncTrigger/TemplateAsyncTrigger';

export const config = [
  {
    label: 'Template async action',
    trigger: TemplateAsyncTrigger,
    code: `
    import { generateAsyncReducer } from 'redux-spark';
    import api from 'api';
    
    const actionCreators = generateAsyncReducer('todoList', api.getTodoList);
    
    export const getTodoList = actionCreators.get;
    export const resetTodoList = actionCreators.reset;


  `
  },
  {
    label: 'Async action',
    trigger: AsyncTrigger,
    code: `
    import api from "api";
    import { Reducer } from "redux-spark";
    
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

    `,
  },
  {
    label: 'Sync action',
    trigger: SyncTrigger,
    code: `
    import { Reducer } from 'redux-spark';

    // Create app reducer
    const global = new Reducer('global', {
      toggleFlag: false,
      title: '',
    });
    
    // Add sync action
    export const toggleFlag = global.addAction('toggleFlag', (state:any) => {
      return {
        ...state,
        toggleFlag: !state.toggleFlag,
      };
    });
    
    const setTitleCreator = global.addAction('setTitle', (state:any, action: any) => {
      return {
        ...state,
        title: action.params.title,
      };
    });
    
    export const setTitle = (title:string) => setTitleCreator({ title });

    `
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
