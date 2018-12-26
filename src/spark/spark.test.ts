import Reducer from './reducer';
import spark from './spark';

describe('spark', () => {
  test('is instantiated and public interface exists', () => {
    expect(spark).toBeDefined();
    expect(typeof spark.registerReducer).toEqual('function');
    expect(typeof spark.getAllReducers).toEqual('function');
    expect(typeof spark.getAllSagas).toEqual('function');
  });

  test('should be able to get created reducers', () => {
    // tslint:disable-next-line
    new Reducer('reducerOne', {});
    // tslint:disable-next-line
    new Reducer('reducerTwo', {});
        
    const reducers:any = spark.getAllReducers();

    expect(typeof reducers).toEqual('object');
    expect(Object.keys(reducers).length).toBe(2);
    expect(typeof reducers.reducerOne).toEqual('function');
    expect(typeof reducers.reducerTwo).toEqual('function');
  });

  test('should throw error if user tries to create two reducers with the same name', () => {
    // tslint:disable-next-line
    new Reducer('sameName', {});
    
    expect(() => {
      // tslint:disable-next-line
      new Reducer('sameName', {});
    }).toThrow();
  });

  test('should be able to get created sagas', () => {
    const getSagasReducer = new Reducer('getSagas', {});
        
    // Add async action
    getSagasReducer.addAsyncAction('actionOne', () => { /*MOCKED*/ }, {
      error: (state:any, action:any) => state,
      start: (state:any, action:any) => state,
      success: (state:any, action:any) => state,
    });

    // Add async action
    getSagasReducer.addAsyncAction('actionTwo', () => { /*MOCKED*/ }, {
      error: (state:any, action:any) => state,
      start: (state:any, action:any) => state,
      success: (state:any, action:any) => state,
    });
        
    const sagas:any[] = spark.getAllSagas();

    expect(Array.isArray(sagas)).toEqual(true);
    expect(sagas.length).toBe(2);

    sagas.forEach(saga => {
      expect(typeof saga).toEqual('object');
      expect(typeof saga.next).toEqual('function');
    });
  });
});
