import { IAsyncData } from '../interfaces';

const baseURL = 'https://jsonplaceholder.typicode.com/todos';

const getTodoList = (): Promise<IAsyncData[]> => {
  return fetch(baseURL)
    .then((response) => (response.json()))
    .then(parsedResponse => parsedResponse);
};

const getTodoItem = (id:string): Promise<IAsyncData> => {
  return fetch(`${ baseURL }/${ id }`)
    .then((response) => (response.json()))
    .then(parsedResponse => parsedResponse);
}

// Fake API
const api = {
  getTodoList,
  getTodoItem,
};

export default api;