import { ITestAsyncData } from '../model/index';

const baseURL = 'https://jsonplaceholder.typicode.com/todos/1';

const fetchTestAsync = (): Promise<ITestAsyncData> => {
  const membersURL = `${ baseURL }`;

  return fetch(membersURL)
      .then((response) => (response.json()))
    .then(parsedResponse => parsedResponse);
};

export default {
  fetchTestAsync,
};