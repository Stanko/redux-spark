import Reducer from './reducer';

interface IReducerMap { 
  [key:string]: Reducer,
};

class Core {
  private reducers:IReducerMap = {};

  // -------- PUBLIC INTERFACE

  /**
   * Save reducer internally. 
   * Called by the reducer itself when it is created.
   *
   * @param reducerName - reducer's name.
   * @param reducer - reducer to be registered.
   */
  public registerReducer(reducerName:string, reducer:Reducer) {
    this.reducers[reducerName] = reducer;
  }

  /**
   * Returns all of the registered reducers, 
   * so they can be used in redux's combineReducers method.
   *
   * @return Map of all registered reducers.
   */
  public getAllReducers():object {
    const reducers = {};

    Object.keys(this.reducers).forEach(reducerName => {
      const reducer = this.reducers[reducerName].getReducerFunction();
      reducers[reducerName] = reducer;
    });

    return reducers;
  }

  /**
   * Returns all of the generated sagas, 
   * so they can be run using saga middleware.
   *
   * @return Array of all generated sagas.
   */
  public getAllSagas():any[] {
    const allSagas:any[] = [];

    Object.keys(this.reducers).forEach(reducerName => {
      const reducerSagas = this.reducers[reducerName].getSagas();
      allSagas.push(...reducerSagas);
    });

    return allSagas;
  }

  // -------- PRIVATE METHODS
}

export default new Core();
