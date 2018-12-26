import Reducer from './reducer';

describe('Reducer', () => {
  test('can be instantiated', () => {
    // Reducer without initial state
    const reducerWithoutInitialState = new Reducer('reducerWithoutInitialState', {});
    expect(reducerWithoutInitialState).toBeDefined();
    expect(reducerWithoutInitialState).toBeInstanceOf(Reducer);

    // Reducer with initial state
    const reducerWithInitialState = new Reducer('reducerWithInitialState', {});
    expect(reducerWithInitialState).toBeDefined();
    expect(reducerWithInitialState).toBeInstanceOf(Reducer);
  });

  test('should be able to add sync action', () => {
    const syncReducer = new Reducer('syncReducer', {});
        
    // Add sync action
    syncReducer.addAction('syncAction', (state:any, action:any) => state);

    // Action handlers
    const actionHandlers = syncReducer.getActionHandlers();

    expect(typeof actionHandlers).toEqual('object');
    expect(Object.keys(actionHandlers).length).toBe(1);
    expect(typeof actionHandlers.SYNC_ACTION).toEqual('function');
  });


  test('should be able to add async action', () => {
    const asyncReducer = new Reducer('asyncReducer', {});
        
    // Add async action
    asyncReducer.addAsyncAction('asyncAction', () => { /*MOCKED*/ }, {
      error: (state:any, action:any) => state,
      start: (state:any, action:any) => state,
      success: (state:any, action:any) => state,
    });

    // Action handlers
    const actionHandlers = asyncReducer.getActionHandlers();

    expect(typeof actionHandlers).toEqual('object');
    expect(Object.keys(actionHandlers).length).toBe(3);
    expect(typeof actionHandlers.ASYNC_ACTION_START).toEqual('function');
    expect(typeof actionHandlers.ASYNC_ACTION_ERROR).toEqual('function');
    expect(typeof actionHandlers.ASYNC_ACTION_SUCCESS).toEqual('function');

    // Sagas
    const sagas = asyncReducer.getSagas();

    expect(Array.isArray(sagas)).toEqual(true);
    expect(sagas.length).toBe(1);
    sagas.forEach(saga => {
      expect(typeof saga).toEqual('function');
    });
  });

  test('should be able to get reducer function', () => {
    const getFunctionReducer = new Reducer('getFunction', {});

    const reducerFunction = getFunctionReducer.getReducerFunction();
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
