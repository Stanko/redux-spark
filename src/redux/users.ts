import generateAsyncReducer from '../generator/generate-async-reducer';

// TODO Fake API
const api = {
  getUsers: () => new Promise(resolve => {
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


const actionCreators = generateAsyncReducer('users', api.getUsers);

export const {
  get,
  reset,
} = actionCreators;