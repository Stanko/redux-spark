import Reducer from './reducer';

describe('Reducer', () => {
  test('can be instantiated', () => {
    // Reducer without initial state
    expect(new Reducer('test')).toBeDefined();
    expect(new Reducer('test')).toBeInstanceOf(Reducer);

    // Reducer with initial state
    expect(new Reducer('test', {})).toBeDefined();
    expect(new Reducer('test', {})).toBeInstanceOf(Reducer);
  });

  test('should be able to add sync action', () => {
    const usersReducer = new Reducer('users', {});
        
    // Add sync action
    usersReducer.addAction('addUser', (state:any, action:any) => state);

    // Action handlers
    const actionHandlers = usersReducer.getActionHandlers();

    expect(typeof actionHandlers).toEqual('object');
    expect(Object.keys(actionHandlers).length).toBe(1);
    expect(typeof actionHandlers.ADD_USER).toEqual('function');
  });


  test('should be able to add async action', () => {
    const usersReducer = new Reducer('users', {});
        
    // Add async action
    usersReducer.addAsyncAction('getUsers', () => { /*MOCKED*/ }, {
      error: (state:any, action:any) => state,
      start: (state:any, action:any) => state,
      success: (state:any, action:any) => state,
    });

    // Action handlers
    const actionHandlers = usersReducer.getActionHandlers();

    expect(typeof actionHandlers).toEqual('object');
    expect(Object.keys(actionHandlers).length).toBe(3);
    expect(typeof actionHandlers.GET_USERS_START).toEqual('function');
    expect(typeof actionHandlers.GET_USERS_ERROR).toEqual('function');
    expect(typeof actionHandlers.GET_USERS_SUCCESS).toEqual('function');

    // Sagas
    const sagas = usersReducer.getSagas();

    expect(Array.isArray(sagas)).toEqual(true);
    expect(sagas.length).toBe(1);
    sagas.forEach(saga => {
      expect(typeof saga).toEqual('function');
    });
  });

  test('should be able to get reducer function', () => {
    const usersReducer = new Reducer('users', {});

    const reducerFunction = usersReducer.getReducerFunction();
    expect(typeof reducerFunction).toEqual('function');
  });
  
  test('should return updated immutable state', () => {
    const initialState = { value: 0 };
    const counterReducer = new Reducer('counter', initialState);

    const increase = counterReducer.addAction('increase', (state:any, action:any) => {
      return {
        value: state.value + 1,
      };
    });
    const decrease = counterReducer.addAction('decrease', (state:any, action:any) => {
      return {
        value: state.value - 1,
      };
    });

    const reducerFunction = counterReducer.getReducerFunction();

    // Empty action
    const stateAfterEmptyAction = reducerFunction();

    expect(stateAfterEmptyAction.value).toEqual(0);

    // Increase action called twice
    const stateAfterIncrease = reducerFunction(initialState, increase());
    const stateAfterSecondIncrease = reducerFunction(stateAfterIncrease, increase());

    expect(stateAfterIncrease.value).toEqual(1);
    expect(stateAfterSecondIncrease.value).toEqual(2);

    // Decrease action
    const stateAfterDecrease = reducerFunction(initialState, decrease());

    expect(stateAfterDecrease.value).toEqual(-1);
  });
});
