import { IAsyncData } from '../interfaces';

const baseURL = 'https://jsonplaceholder.typicode.com/users';

const getUsersList = (): Promise<IAsyncData[]> => {
  return fetch(baseURL)
    .then((response) => (response.json()))
    .then(parsedResponse => parsedResponse);
};

const getUser = (params:any): Promise<IAsyncData> => {
  return fetch(`${ baseURL }/${ params.id }`)
    .then((response) => (response.json()))
    .then(parsedResponse => parsedResponse);
}

// Fake API
const api = {
  getUsersList,
  getUser,
};

export default api;
