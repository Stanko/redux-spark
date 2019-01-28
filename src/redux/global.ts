import { Reducer } from '../spark';

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
    title: action.title,
  };
});

export const setTitle = (title:string) => setTitleCreator({ title });
