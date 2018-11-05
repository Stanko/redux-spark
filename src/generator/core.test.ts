import core from './core';
import Reducer from './reducer';

describe('Core', () => {
  test('is instantiated and public interface exists', () => {
    expect(core).toBeDefined();
    expect(typeof core.registerReducer).toEqual('function');
    expect(typeof core.getAllReducers).toEqual('function');
    expect(typeof core.getAllSagas).toEqual('function');
  });

  test('should be able to get created reducers', () => {
    const usersReducer = new Reducer('users', {});
    const settingsReducer = new Reducer('settings', {});
        
    const reducers:any = core.getAllReducers();

    expect(typeof reducers).toEqual('object');
    expect(Object.keys(reducers).length).toBe(2);
    expect(typeof reducers.users).toEqual('function');
    expect(typeof reducers.settings).toEqual('function');
  });

  test('should be able to get created sagas', () => {
    const usersReducer = new Reducer('users', {});
        
    // Add async action
    usersReducer.addAsyncAction('getUsers', () => { /*MOCKED*/ }, {
      error: (state:any, action:any) => state,
      start: (state:any, action:any) => state,
      success: (state:any, action:any) => state,
    });

    // Add async action
    usersReducer.addAsyncAction('updateUser', () => { /*MOCKED*/ }, {
      error: (state:any, action:any) => state,
      start: (state:any, action:any) => state,
      success: (state:any, action:any) => state,
    });
        
    const sagas:any[] = core.getAllSagas();

    expect(Array.isArray(sagas)).toEqual(true);
    expect(sagas.length).toBe(2);
    sagas.forEach(saga => {
      expect(typeof saga).toEqual('function');
    });
  });
});
