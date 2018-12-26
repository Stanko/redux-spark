import { camel2const } from './utils';

describe('Utils', () => {
  test('camel to constant case', () => {
    const getUsers = camel2const('getUsers');
    const getUserById = camel2const('getUserById');

    expect(getUsers).toEqual('GET_USERS');
    expect(getUserById).toEqual('GET_USER_BY_ID');

  });
});

